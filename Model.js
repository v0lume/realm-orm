import RealmQuery from './libs/query';
import Realm from 'realm'; // eslint-disable-line
import DB from './';
import merge from './libs/merge';

const isNode = () => typeof process === 'object' && process + '' === '[object process]';

/* istanbul ignore next  */
class FakeRealmObject {
  isValid () {
    console.warn('isValid not available in node');
  }

  objectSchema () {
    console.warn('objectSchema not available in node');
  }
  linkingObjects () {
    console.warn('linkingObjects not available in node');
  }
}

const RealmObject = isNode() ? FakeRealmObject : /* istanbul ignore next  */ Realm.Object;

/**
 *
 * @class Model
 */
export default class Model extends RealmObject {

  /**
   * Model schema
   * @type {Realm.ObjectSchema}
   * @static
   * @abstract
   * @memberof Model
   */
  static schema

  /**
   * Array of string used for search text
   * @type {string[]}
   * @static
   * @abstract
   * @memberof Model
   */
  static stringFields = []

  /**
   * search object that contain text in stringFields
   *
   * @static
   * @param {string} term
   * @param {number|boolean} limit (if true return query)
   * @returns {Realm.Results|RealmQuery}
   * @memberof Model
   */
  static searchText (term, limit) {
    if (this.stringFields.length === 0) {
      throw new Error('stringFields not defined');
    }
    let terms = term.trim().split(' ');
    let query = this.query().beginGroup();
    let createQuery = (field) => {
      let queryField = (splittedTerm) => {
        query.contains(field, splittedTerm, true);
      };
      query.beginOrGroup();
      terms.forEach(queryField);
      query.endGroup();
    };
    this.stringFields.forEach(createQuery);
    if (limit && typeof limit === 'boolean') {
      return query;
    }
    let res = query.findAll();
    if (limit) {
      res = res.slice(0, limit);
    }
    return res;
  }
  /**
  * get a query instance of Model
  * @static
  * @returns {RealmQuery}
  * @memberof Model
  */
  static query () {
    return RealmQuery.query(this.all());
  }

  /**
   * Find object by its primary key
   * @static
   * @param {number} id
   * @returns {Model}
   * @memberof Model
   */
  static find (id) {
    return DB.db.objectForPrimaryKey(this.schema.name, id);
  }

  /**
   * get all Object of model
   *
   * @static
   * @returns {Realm.Results}
   * @memberof Model
   */
  static all () {
    return DB.db.objects(this.schema.name);
  }
  /**
   * Get all primaryKey of Model
   * @static
   * @returns {Array}
   * @memberof Model
   */
  static ids () {
    return this.all().map((obj) => obj[this.schema.primaryKey]);
  }
  /**
   * insert new object in database
   * @static
   * @param {(array|any)} data
   *
   * @returns {Promise<void>}
   * @memberof Model
   */
  static insert (data, object) {
    return new Promise((resolve) => {
      DB.db.write(() => {
        if (Array.isArray(data)) {
          data.forEach(this.doInsert.bind(this));
          resolve();
          return ;
        }
        this.doInsert(data, object);
        resolve();
      });
    });
  }
  /**
 * @private
 * @param {any} data 
 */
  static doInsert (data) {
    /* istanbul ignore next  */
    if (!data) {
      return;
    }
    if (typeof this.transform === 'function') {
      this.transform(data);
    }
    /* istanbul ignore next  */
    if (typeof this.syncObject === 'function') {
      this.syncObject(data);
    }
    DB.db.create(this.schema.name, data, this.hasPrimary(data));
  }
  /**
   * update object 
   * @static
   * @param {Realm.Object} object 
   * @param {any} data 
   * @memberof Model
   */
  static update (object, data) {
    DB.db.write(() => merge(data, object));
  }
  /**
   * delete results or object from database
   * @param {Realm.Results|Realm.Object} object 
   * @memberof Model
   */
  static delete (object) {
    DB.db.write(() => DB.db.delete(object));
  }
  /**
   *
   * @private
   * @static
   * @param {any} data
   * @returns {boolean}
   * @memberof Model
   */
  static hasPrimary (data) {
    return !!this.schema.primaryKey && !!data[this.schema.primaryKey];
  }

  /**
   * update model
   *
   * @param {any} data
   * @instance
   * @memberof Model
   */
  update (data) {
    Model.update(this, data);
  }

  /**
   * delete model
   * @instance
   * @memberof Model
   */
  delete () {
    Model.delete(this);
  }
}
