export default function parse(metadata, value, modelParser) {
    value.map(e => modelParser.parse(metadata.fields, e));
    return value;
}