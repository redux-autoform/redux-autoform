export default function parse(metadata, value, modelParser) {
    modelParser.parse(metadata.fields, value, modelParser);
    return value;
}