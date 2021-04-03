# Placeholder loading

Simple and flexible, css only, content placeholder loading animation.

## Demo

<https://zalog.github.io/placeholder-loading/>

Take a look at this examples, but keep in mind that it's flexible enough to play with elements as you need.

You can change the order, add avatar or image, change text bar sizes, etc.

<p align="center">
    <img src="docs/imgs/placeholder-loading-demo-1.gif">
</p>

<p align="center">
    <img src="docs/imgs/placeholder-loading-demo-2.gif">
</p>

<p align="center">
    <img src="docs/imgs/placeholder-loading-demo-3.gif">
</p>

## Installing

### Via npm

- `npm install placeholder-loading --save`
- `@import "~/node_modules/placeholder-loading/src/scss/placeholder-loading";` - please modify the path accordingly
- change sass variables if you need so:

```scss
$ph-direction:            ltr !default;
$ph-bg:                   #fff !default;
$ph-color:                #ced4da !default;
$ph-border:               1px solid darken($ph-bg, 10%) !default;
$ph-border-radius:        2px !default;

$ph-cols:                 12 !default;
$ph-cols-remove-odd:      true !default;
$ph-gutter:               30px !default;
$ph-spacer:               15px !default;

$ph-avatar-border-radius: 50% !default;

$ph-animation-duration:   0.8s !default;
```

### Via bower

Just replace npm with bower: `bower install placeholder-loading --save`

### Via cdn

- <https://unpkg.com/placeholder-loading/dist/css/placeholder-loading.min.css>
- or <https://cdn.jsdelivr.net/npm/placeholder-loading/dist/css/placeholder-loading.min.css>

```html
<head>
    <link rel="stylesheet" href="https://unpkg.com/placeholder-loading/dist/css/placeholder-loading.min.css">
</head>
```

## Usage

A simple html markup would be something like this:

```html
<div class="ph-item">
    <div class="ph-col-12">
        <div class="ph-picture"></div>
        <div class="ph-row">
            <div class="ph-col-6 big"></div>
            <div class="ph-col-4 empty big"></div>
            <div class="ph-col-2 big"></div>
            <div class="ph-col-4"></div>
            <div class="ph-col-8 empty"></div>
            <div class="ph-col-6"></div>
            <div class="ph-col-6 empty"></div>
            <div class="ph-col-12"></div>
        </div>
    </div>
</div>
```

- grid classes: `.ph-col-2`, `.ph-col-4`, `.ph-col-6`, `.ph-col-8`, `.ph-col-10`, `.ph-col-12`

- elements inside: `.ph-avatar` and `.ph-picture`

- use `.big` for bigger text line

## Built With

- [SASS](http://sass-lang.com/)
- [Node.js](https://nodejs.org/)
- [Gulp](https://gulpjs.com/)
- [postcss](https://github.com/postcss/postcss)
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [cssnano](https://github.com/ben-eb/cssnano)
- [browser-sync](https://www.browsersync.io/)
- [Visual Studio Code](https://code.visualstudio.com/)

## Contributing

Please read Angular's [CONTRIBUTING.md](https://github.com/angular/angular/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/zalog/placeholder-loading/tags).

## Authors

- **Catalin Zalog** - *Initial work* - [zalog.ro](http://zalog.ro/)

See also the list of [contributors](https://github.com/zalog/placeholder-loading/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
