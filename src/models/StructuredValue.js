import { Entity, Embeddable } from '@themost/jspa';
import { Intangible } from './Intangible';

@Entity({
    abstract: true
})
class StructuredValue extends Intangible {
}

export {
    StructuredValue
}