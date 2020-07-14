import Artist from "./artist.model";

export default interface Asset {
  id: string;
  title: string;
  description: string;
  updated_at: any;
  created_at: any;
  image_url?: string;
  artist_id?: string;
  artist?: Artist;
}
