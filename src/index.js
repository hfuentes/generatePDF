const degrees = require('pdf-lib').degrees
const PDFDocument = require('pdf-lib').PDFDocument
const rgb = require('pdf-lib').rgb
const StandardFonts = require('pdf-lib').StandardFonts
const fs = require('fs')

async function main() {
    const existingPdfBytes = fs.readFileSync('./src/templates/template_01.pdf')
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    firstPage.drawText('This text was added with JavaScript!', {
        x: 5,
        y: height / 2 + 300,
        size: 50,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
        rotate: degrees(-45),
    })
    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync('./src/templates/output.pdf', pdfBytes)
}

main()