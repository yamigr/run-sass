# run-sass

> Package to manage and compile sass-files at startup or in runtime without restarting.

This package will manage and compile .sass or .scss-files. At startup it will compile each file from sourceDir (.sass || .scss) into destinationDir (.css)
The file-watcher manages the file-changes, -removes or -creations and handle the files on each event.

<a name="installing"></a>
## Installing

```sh
npm install run-sass --save
```

## Use

```js

var sass = new Sass({ sourceDir : __dirname + '/sass', destinationDir : __dirname + '/css' }) 
sass.run()

```
<a name="authors"></a>

## Authors

* **Yannick Grund** - *Initial work* - [yamigr](https://github.com/yamigr)

<a name="license"></a>

## License

This project is licensed under the MIT License

