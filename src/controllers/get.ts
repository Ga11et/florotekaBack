import { AirtableAdminRecordType, AirtableGaleryRecordType, AirtablePlantRecordType } from './../models/airtableModels';
import { Request, Response } from 'express';
import base from '../airtable';
import { PostPropsType } from '../models';
import { AirtablePostRecordType } from '../models/airtableModels';
import { tokenServises } from '../servises/tokenServises';
import { loginServises } from '../servises/loginServises';
import { GaleryPhotoType, plantPropsType } from '../models/appTypes';
import { mainServises } from '../servises/mainServises';
import { postServises } from '../servises/postServises';

export const getControllers = {
  getPlants: async (req: Request, res: Response) => {
    const records = (await base('plants').select().firstPage()) as AirtablePlantRecordType[];

    const returnValue = records.map((el) => {
      const plantItem: plantPropsType = {
        id: el.id,
        name: el.fields.Name,
        latin: el.fields.latin,
        description: el.fields.description,
        date: el.fields.date,
        family: el.fields.family,
        from: el.fields.from,
        having: el.fields.having,
        livingPlace: el.fields.livingPlace,
        type: el.fields.type,
        img: mainServises.imageMapping(el.fields.image),
      };
      return plantItem;
    });

    res.json(returnValue);
  },

  getPosts: async (req: Request, res: Response) => {
    let records = [] as AirtablePostRecordType[];

    const processPage = (pageRecords: AirtablePostRecordType[], fetchNext: Function) => {
      records = [...records, ...pageRecords];
      fetchNext();
    };

    const finishProcessing = () => {
      const returnValue: PostPropsType[] = postServises.postsMapping(records);

      res.status(200).json(returnValue);
    };

    await base('posts').select().eachPage(processPage, finishProcessing);
  },

  getPhotos: async (req: Request, res: Response) => {
    let records = [] as AirtableGaleryRecordType[];

    const processPage = (pageRecords: AirtableGaleryRecordType[], fetchNext: Function) => {
      records = [...records, ...pageRecords];
      fetchNext();
    };

    const finishProcessing = () => {
      const returnValue: GaleryPhotoType[] = records.map((record) => ({
        id: record.id,
        image: mainServises.imageMapping(record.fields.photos)[0],
        lastModified: record.fields.lastModified,
      }));

      res.status(200).json(returnValue);
    };

    await base('galery').select().eachPage(processPage, finishProcessing);
  },

  getRefresh: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = tokenServises.checkRefreshToken(refreshToken) as {
        id: string;
        login: string;
      };
      if (!userData.id)
        return res.status(401).json([
          {
            param: 'data.origin',
            msg: 'Не авторизован (refresh token is unavailable))',
          },
        ]);

      const records = (await base('admins').select().firstPage()) as AirtableAdminRecordType[];

      const existedAdminRecord = records.find((el) => el.id === userData.id);
      if (!existedAdminRecord)
        return res.status(401).json([
          {
            param: 'data.origin',
            msg: 'Не авторизован (admin is unavailable)',
          },
        ]);

      const tokens = await loginServises.generateTokens({
        id: userData.id,
        login: userData.login,
      });

      res
        .status(200)
        .cookie('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite: 'none',
          secure: true,
        })
        .json({ token: tokens.accessToken });
    } catch (error) {
      return res.status(401).json([{ param: 'data.origin', msg: 'Не авторизован', error: error }]);
    }
  },
  async getPostById(req: Request, res: Response<PostPropsType>) {
    try {
      const { postId } = req.params;

      const records = [] as AirtablePostRecordType[];

      const processPage = (pageRecords: AirtablePostRecordType[], fetchNext: Function) => {
        records.push(...pageRecords);
        fetchNext();
      };

      const finishProcessing = () => {
        const record = records.find((el) => el.id === postId);
        if (record) return res.status(200).json(postServises.postMapping(record));
        return res.status(200).json(undefined);
      };

      await base('posts').select().eachPage(processPage, finishProcessing);
    } catch (error) {
      console.log(error);
      return res.status(500).json(undefined);
    }
  },
};
