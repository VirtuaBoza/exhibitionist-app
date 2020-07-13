alter table "public"."users"
           add constraint "users_org_id_fkey"
           foreign key ("org_id")
           references "public"."orgs"
           ("id") on update restrict on delete cascade;
