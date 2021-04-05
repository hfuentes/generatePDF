const degrees = require('pdf-lib').degrees
const PDFDocument = require('pdf-lib').PDFDocument
const rgb = require('pdf-lib').rgb
const StandardFonts = require('pdf-lib').StandardFonts
const fs = require('fs')
const moment = require('moment')

const date = {
    year: 2021, month: 2, day: 20,
    hour: 20, min: 7, seg: 55,
    format: 'DD-MM-YYYY HH:mm:ss'
}
const data = {
    // name: 'Héctor Gerardo Fuentes Gaete',
    // rut: '16748540-5',
    // outputFile: 'cerrillos_hector_' + date.year + date.month + date.day + date.hour + date.min + date.seg + '.pdf',
    name: 'Geraldine del Carmen Morales Castro',
    rut: '16877775-2',
    outputFile: 'cerrillos_geraldine_' + date.year + date.month + date.day + date.hour + date.min + date.seg + '.pdf',
    destino: 'El Bosque',
    broadcast: moment(new Date(
        date.year,
        date.month - 1,
        date.day,
        date.hour,
        date.min - 3,
        date.seg - 4
    )).format(date.format),
    until: moment(new Date(
        date.year,
        date.month - 1,
        date.day,
        date.hour + 3,
        date.min,
        date.seg
    )).format(date.format),
    from: moment(new Date(
        date.year,
        date.month - 1,
        date.day,
        date.hour,
        date.min,
        date.seg
    )).format(date.format)
}

async function main(data) {
    const existingPdfBytes = fs.readFileSync('./src/templates/template_01.pdf')
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    firstPage.drawRectangle({
        x: 90,
        y: 143,
        width: 60,
        height: 10,
        color: rgb(1, 1, 1)
    })
    firstPage.drawText(data.broadcast, {
        x: 90,
        y: 145,
        size: 6,
        font: helveticaFont
    })
    firstPage.drawRectangle({
        x: 85,
        y: 235,
        width: 70,
        height: 10,
        color: rgb(1, 1, 1)
    })
    firstPage.drawText(data.until, {
        x: 88.5,
        y: 237.5,
        size: 6.7,
        font: helveticaFont,
        color: rgb(0, 0.45, 0.16)
    })
    firstPage.drawRectangle({
        x: 85,
        y: 248,
        width: 70,
        height: 10,
        color: rgb(1, 1, 1)
    })
    firstPage.drawText(data.from, {
        x: 88.5,
        y: 251,
        size: 6.7,
        font: helveticaFont,
        color: rgb(0, 0.45, 0.16)
    })
    firstPage.drawRectangle({
        x: 85,
        y: 330,
        width: 200,
        height: 10,
        color: rgb(1, 1, 1)
    })
    firstPage.drawText(data.name, {
        x: 88.5,
        y: 332,
        size: 5.5,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    })
    firstPage.drawRectangle({
        x: 85,
        y: 320,
        width: 200,
        height: 10,
        color: rgb(1, 1, 1)
    })
    firstPage.drawText(data.rut, {
        x: 88.5,
        y: 320,
        size: 5.5,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    })
    firstPage.drawRectangle({
        x: 85,
        y: 200,
        width: 200,
        height: 10,
        color: rgb(1, 1, 1)
    })
    firstPage.drawText(data.destino, {
        x: 88.5,
        y: 201.5,
        size: 5.5,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    })
    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync('./src/templates/' + data.outputFile, pdfBytes)
}

main(data)