export class ServiceUtils {

  static getId(restEntity: Object): Number {
    const selfLink = restEntity['_links']['self']['href'];
    const splitted = selfLink.split('/');
    if (splitted[splitted.length - 1] === '') {
      return Number(splitted[splitted.length - 2]);
    } else {
      return Number(splitted[splitted.length - 1]);
    }
  }
}
