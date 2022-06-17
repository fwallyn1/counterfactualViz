const urls = [DataUrl];

Promise.all(urls.map(url => d3.json(url))).then(run);

function run(dataset) {
    d3Chart(dataset[0]);
};