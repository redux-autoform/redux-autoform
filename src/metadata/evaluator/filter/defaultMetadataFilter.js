export default {
    filter: function(propertyMetadata, model, keyPrefix, metadataEvaluator, reduxProps, onChange) {
        
        if(!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
        if(!model) throw Error('Argument \'model\' should be truthy');
               
        propertyMetadata.key = keyPrefix;
        
        // set redux properties
        if(reduxProps.hasOwnProperty(propertyMetadata.name)) {
            propertyMetadata.reduxFormProps = reduxProps[propertyMetadata.name];
        }
        
        return propertyMetadata;
    }
}