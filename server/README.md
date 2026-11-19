# copycat

npx sequelize-cli model:generate --name User --attributes firstName:string,email:string

To run migration you can use 
```bash
docker exec -it copycat_backend npx sequelize-cli db:migrate
```

To undo migration you can use
```bash
docker exec -it copycat_backend npx sequelize-cli db:migrate:undo
```
Backend and Database need to be running (I don't know why, need to check it)

To generate migrations use:
```bash
cd server
npx sequelize-cli migration:generate --name migration-name
```

You can generate migration code with model by using this comand:
```bash
npx sequelize-cli model:generate --name <Model_Name> --attributes <atribute_name1>:<atribute_type1>,<atribute_name2>:<atribute_type2>
```


