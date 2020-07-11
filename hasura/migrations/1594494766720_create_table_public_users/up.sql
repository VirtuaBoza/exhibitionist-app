CREATE TABLE "public"."users"("id" text NOT NULL, "client_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON UPDATE restrict ON DELETE cascade);
