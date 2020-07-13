CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."assets"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "org_id" uuid NOT NULL, "title" text NOT NULL, "description" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON UPDATE restrict ON DELETE cascade);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_assets_updated_at"
BEFORE UPDATE ON "public"."assets"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_assets_updated_at" ON "public"."assets" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
