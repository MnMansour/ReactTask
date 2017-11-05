<center>
  <h3>Simple react table</h3>
</center>


Application is based on create-react-app.
It's a simple table with list of users.
You can do following actions:
 + add item
 + remove
 + modify
 + sort table by multiple properties in both directions


### Installation

```
npm install
```

After that just run
```
npm start
```
### App structure

1. Application has hardcoded users data in *src/data.js* file. It's a list of 20 items.
2. *App.js* - main component
3. */item/index.js* - row component
4. */add_form/index.js* - form component for adding new items
5. For user id's  - timestamp is used to prevent repetitions. It's quite hard to add 2 records in 1 millisecond with GUI interface.
6. All function declared in class begins with underscore symbol **_mufunc**
7. All function that are called via props declared without underscore **myfunc**
