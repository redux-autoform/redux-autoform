export default function parse(metadata, value, modelParser) {
    return value.map(item => modelParser.process(item, (metadata.fields)));
}