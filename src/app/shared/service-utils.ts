export class ServiceUtils {

  static getId(restEntity: Object): number {
    const selfLink = restEntity['_links']['self']['href'];
    const splitted = selfLink.split('/');
    if (splitted[splitted.length - 1] === '') {
      return splitted[splitted.length - 2];
    } else {
      return splitted[splitted.length - 1];
    }
  }
}
