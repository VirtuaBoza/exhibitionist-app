import Artist from "./artist.model";

export default interface Asset {
  id: string;
  title: string;
  description: string;
  updated_at: any;
  created_at: any;
  artist?: Artist;
}
