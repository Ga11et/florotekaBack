import { AirtableImageType } from '../models/airtableModels';
import { ImageType } from '../models/appTypes';

export const mainServises = {
  imageMapping (images: AirtableImageType[]): ImageType[] {
    return images.map( image => ({ full: image.thumbnails.full.url, small: image.thumbnails.large.url }) )
  }
}