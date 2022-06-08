# Installation  

## Technologies  

For this project we are using [node.js 16.9.1](https://nodejs.org/download/release/v16.9.1/) and [PostgreSQL 14.2](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)  

## First start

In order to launch the project for the first time on your machine you need to copy the file `.env.sample` and change the PASSWORD line by the one inserted at the installation of PostgreSQL  

## PostgreSQL configuration

You must execute the sql commands below :
`psql -U postgres` Login as administrator of your database

```sql
CREATE ROLE octorun WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION
  PASSWORD 'yourpassword';
```

```sql
CREATE DATABASE octorun
    WITH 
    OWNER = octorun
    ENCODING = 'UTF8'
    LC_COLLATE = 'French_France.1252'
    LC_CTYPE = 'French_France.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
```

When you've created the database & the user leave the application and login back with taht command :
`psql -U octorun`  

Now create the tables

```sql
CREATE TABLE IF NOT EXISTS "user"
(
    "idUser" uuid NOT NULL,
    "username" character varying(26) NOT NULL,
    PRIMARY KEY ("idUser")
);

CREATE SEQUENCE games_idGame_seq START WITH 1;

CREATE TABLE IF NOT EXISTS "games"
(
    "idGame" integer NOT NULL DEFAULT nextval('games_idGame_seq'),
    CONSTRAINT games_pkey PRIMARY KEY ("idGame")
);

CREATE TABLE IF NOT EXISTS "lang"
(
    "codePays" character varying(2) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT lang_pkey PRIMARY KEY ("codePays")
);

CREATE SEQUENCE leaderboard_idGame_seq START WITH 1;

CREATE TABLE IF NOT EXISTS "leaderboard"
(
    "idGame" integer NOT NULL DEFAULT nextval('leaderboard_idGame_seq'),
    "idUser" uuid NOT NULL,
    score numeric(100,0) NOT NULL,
    "time" numeric(100,0) NOT NULL,
    CONSTRAINT "idGame" FOREIGN KEY ("idGame")
        REFERENCES public.games ("idGame") MATCH FULL
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "idUser" FOREIGN KEY ("idUser")
        REFERENCES public."user" ("idUser") MATCH FULL
        NOT VALID
);

CREATE TABLE "translate"
(
    "codePays" character varying(2) NOT NULL,
    "name" character varying(255) NOT NULL,
    "description" text NOT NULL,
    "help" text NOT NULL,
    CONSTRAINT "codePays" FOREIGN KEY ("codePays")
        REFERENCES public.lang ("codePays") MATCH FULL
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
```

If you want to delete all tables and sequences

```sql
drop table games,lang,leaderboard,translate,"user";

drop sequence games_idGame_seq, leaderboard_idGame_seq;
```
