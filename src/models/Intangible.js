import { Embeddable, Entity } from '@themost/jspa';
import { Thing } from './Thing';

@Entity({
    abstract: true
})
class Intangible extends Thing {

}

export {
    Intangible
}