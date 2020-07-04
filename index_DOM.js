let url = 'https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=bzxuqGArLrW6lhAmc1hk5VYUSeG6yrTM'
let map = new Map();
let id = 1;
let toggle = 1;


async function fetchNewsFeed() {
    
    let news_stories = await (await fetch(url)).json();

    for (let index = 0; index < news_stories.results.length; index++) {
        
        let key = news_stories.results[index].section;
        let story = news_stories.results[index];

            if(!map.has(key)) {
                map.set(key,[story]);
                
            } else {
                let r1 = map.get(key);
                r1.push(story);
            }
    }
}

function displayTopStories() {

    for (const key of map.keys()) {

        let div1 = document.createElement('div');
        div1.setAttribute('class','accordion');
        div1.setAttribute('id',`accordionExample${id}`);

        let div2 = document.createElement('div');
        div2.setAttribute('class','card');
        div1.appendChild(div2);

        let div3 = document.createElement('div');
        div3.setAttribute('class','card-header');
        div3.setAttribute('id','headingOne');
        div2.appendChild(div3);

        let h1 = document.createElement('h2');
        h1.setAttribute('class','mb-0');
        div3.appendChild(h1);

        let b1 = document.createElement('button');
        b1.setAttribute('id',`button${id}`);
        b1.setAttribute('class','btn btn-link btn-block text-left');
        b1.setAttribute('type','button');
        b1.setAttribute('onclick','toggleData(`${id}`)');
        b1.setAttribute('data-toggle','collapse');
        b1.setAttribute('data-target',`#${id}`)
        b1.setAttribute('aria-expanded','false');
        b1.setAttribute('aria-controls','collapseOne');
        b1.innerHTML = `${key}`;
        h1.appendChild(b1);

        

        let values = map.get(key);

        let div5 = document.createElement('div');
        div5.setAttribute('class','row');

        let div4 = document.createElement('div');
        div4.setAttribute('class','collapse');
        div4.setAttribute('id',`${id}`);
        div4.setAttribute('aria-labelledby','headingOne');
        div4.setAttribute('data-parent',`#accordionExample${id}`);
        div2.appendChild(div4);

        div4.appendChild(div5);

        for (const value of values) {

            let div6 = document.createElement('div');
            div6.setAttribute('class','col-6');
            div5.appendChild(div6);

            let div7 = document.createElement('div');
            div7.setAttribute('class','card m-3');
            div6.appendChild(div7);

            let div8 = document.createElement('div');
            div8.setAttribute('class','row no-gutters');
            div7.appendChild(div8);

            let div9 = document.createElement('div');
            div9.setAttribute('class','col-md-3');
            div8.appendChild(div9);

            let src = getImageSource(value);
            let img = document.createElement('img');
            img.setAttribute('src',`${src}`);
            img.setAttribute('alt','image');
            img.setAttribute('class','card-img img-css');
            div9.appendChild(img);

            let div10 = document.createElement('div');
            div10.setAttribute('class','col-md-9');
            div8.appendChild(div10);

            let div11 = document.createElement('div');
            div11.setAttribute('class','card-body');
            div10.appendChild(div11);

            let div12 = document.createElement('div');
            div12.setAttribute('class','card-title title-css');
            div12.innerHTML = `${value.item_type}: &nbsp &nbsp ${value.created_date} <br> ${value.title} <br>`;
            div11.appendChild(div12);

            let p1 = document.createElement('p');
            p1.setAttribute('class','card-text');
            p1.innerHTML = `${value.abstract}-${value.byline}`;
            div11.appendChild(p1);

            let a1 = document.createElement('a');
            a1.setAttribute('class','card-text');
            a1.setAttribute('href',`${value.url}`);
            a1.innerHTML = 'Click Here To Read Complete Article'
            div11.appendChild(a1);

        }
        id = id + 1;
        document.body.appendChild(div1);;
    }

}

function getImageSource(value) {
    let multimedia = value.multimedia;
    if(multimedia == null) {
        return '';
    } else {
        for (const obj of multimedia) {
            let url = String(obj.url);
            let bool = url.endsWith('articleInline.jpg');
            if(bool) {
                return url;
            } 
        }
        return '';
    }
}

function toggleData(id) {
    toggle++;
    let id1 = id.split('n');
    let button = document.getElementById(id);
    let div = document.getElementById(id1[1]);

    if(toggle % 2 == 0) {
        div.setAttribute('class','collapse show');
    } else {
        button.setAttribute('class','btn btn-link btn-block text-left collapsed');
        div.setAttribute('class','collapse');
        toggle = 1;
    }

}

async function executeCalls() {
    let r1 = await fetchNewsFeed();
    let r2 = await displayTopStories();
}

executeCalls();
