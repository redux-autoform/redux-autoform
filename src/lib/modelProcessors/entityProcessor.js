export default function parse(metadata, value, modelParser) {
    return modelParser.process(value, metadata.fields, modelParser);
}