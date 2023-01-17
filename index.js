let ipp = require("ipp");
let PDFDocument = require("pdfkit");

let doc = new PDFDocument;
doc.text("Hello World");

let buffers = [];
doc.on('data', buffers.push.bind(buffers));
doc.on('end', function () {
    let printer = ipp.Printer("http://10.211.55.3:22222/ipp/print");
    let file = {
        "operation-attributes-tag": {
            "requesting-user-name": "User",
            "job-name": "Print Job",
            "document-format": "application/pdf"
        },
        data: Buffer.concat(buffers)
    };

    printer.execute("Print-Job", file, function (err, res) {
        console.log("Printed: "+res.statusCode);
    });
});
doc.end();

// let mdns = require('mdns'),
//     browser = mdns.createBrowser(mdns.tcp('ipp'));
//
// mdns.Browser.defaultResolverSequence[1] = 'DNSServiceGetAddrInfo' in mdns.dns_sd ? mdns.rst.DNSServiceGetAddrInfo() : mdns.rst.getaddrinfo({families:[4]});
//
// browser.on('serviceUp', function (rec) {
//     console.log(rec.name, 'http://'+rec.host+':'+rec.port+'/'+rec.txtRecord.rp);
// });
// browser.start();
