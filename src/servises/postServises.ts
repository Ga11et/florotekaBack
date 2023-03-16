import { PostPropsType } from "../models";
import { AirtablePostRecordType } from "../models/airtableModels";
import { mainServises } from "./mainServises";

export const postServises = {
  postsMapping(posts: AirtablePostRecordType[]): PostPropsType[] {
    return posts.map((post) => ({
      id: post.id,
      heading: post.fields.Name,
      description: post.fields.description,
      date: post.fields.date,
      text: post.fields.text,
      type: post.fields.type,
      after: post.fields.after
        ? mainServises.imageMapping(post.fields.after)[0]
        : { small: "", full: "", id: "" },
      before: post.fields.before
        ? mainServises.imageMapping(post.fields.before)[0]
        : { small: "", full: "", id: "" },
      images: post.fields.images
        ? mainServises.imageMapping(post.fields.images)
        : [],
    }));
  },
  postMapping(post: AirtablePostRecordType): PostPropsType {
    return {
      id: post.id,
      heading: post.fields.Name,
      description: post.fields.description,
      date: post.fields.date,
      text: post.fields.text,
      type: post.fields.type,
      after: post.fields.after
        ? mainServises.imageMapping(post.fields.after)[0]
        : { small: "", full: "", id: "" },
      before: post.fields.before
        ? mainServises.imageMapping(post.fields.before)[0]
        : { small: "", full: "", id: "" },
      images: post.fields.images
        ? mainServises.imageMapping(post.fields.images)
        : [],
    };
  },
};
