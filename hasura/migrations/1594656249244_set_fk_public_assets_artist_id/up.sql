alter table "public"."assets"
           add constraint "assets_artist_id_fkey"
           foreign key ("artist_id")
           references "public"."artists"
           ("id") on update restrict on delete set null;
