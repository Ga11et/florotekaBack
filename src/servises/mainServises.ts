import { AirtableImageType } from '../models/airtableModels';
import { ImageType } from '../models/appTypes';

export const mainServises = {
  imageMapping (images: AirtableImageType[]): ImageType[] {
    return images.map( image => ({ full: image.thumbnails ? image.thumbnails.full.url : '', small: image.thumbnails ? image.thumbnails.large.url : '', id: image.id }) )
  }
}