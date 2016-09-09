import BootstrapFactory from './factory/BootstrapFactory';
import TypeConfig from './factory/constants/TypeConstants'

export const EditComponentFactory = new BootstrapFactory(TypeConfig.edit);
export const DetailsComponentFactory = new BootstrapFactory(TypeConfig.details);