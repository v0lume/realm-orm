/// <reference types="realm" />
import { Results } from 'realm';
export declare type ILogicOperator = 'AND' | 'OR';
export declare type EqualValueType = string | number | boolean | Date;
export declare type CompareValueType = number | Date;
declare type groupCallback = (cb: RealmQuery<any>) => RealmQuery<any>
declare class RealmQuery<M> {
    private objects;
    private criteria;
    constructor(objects?: Results<M>);
    addCriteria(critera: any): RealmQuery<M>;
    private getFilteredObjects(): Realm.Results<M>;
    toString(): string;
    /**
     * Returns the average of a given field
     * @param fieldName {string}
     * @return {number}
     */
    avg (fieldName: keyof M): number;
    /**
   * select distinct element
   *
   * @param {string|string[]} fieldName
   * @return {RealmQuery}
   */
    distinct (fieldName: keyof M): RealmQuery<M>
    /**
     * Set sorted into realm.objects
     *
     * @param fieldName {string}
     * @param order {boolean} true => desc, false => asc
     * @return {RealmQuery}
     */
    sort(fieldName: keyof M, order?: 'ASC' | 'DESC'): RealmQuery<M>;

    /**
     * Finds all objects that fulfill the query conditions
     * @return {Results}
     */
    findAll(): Results<M>;


    /**
     * Finds the first object that fulfills the query conditions
     */
    findFirst(): M;

    /**
    * Returns the maximum value of the values in the collection or of the given property
    * among all the objects in the collection, or undefined if the collection is empty.
    * Only supported for int, float, double and date properties.
    * null values are ignored entirely by this method and will not be returned.
    */
    max(fieldName: keyof M): number;

    /**
    * Returns the minimum value of the values in the collection or of the given property
    * among all the objects in the collection, or undefined if the collection is empty.
    * Only supported for int, float, double and date properties.
    * null values are ignored entirely by this method and will not be returned
    */
    min(fieldName: keyof M): M[keyof M];

    /**
     * Calculates the sum of a given field
     */
    sum(fieldName: keyof M): number;

    /**
     * Calculates the average of a given field
     */
    avg(fieldName: keyof M): number;

    /**
     * Counts the number of objects that fulfill the query conditions
     *
     * @return {number}
     */
    count(): number;

    /**
     * Between condition
     *
     * @param fieldName {string}
     * @param from {CompareValueType}
     * @param to {CompareValueType}
     * @return {RealmQuery}
     */
    between(fieldName: keyof M, from: CompareValueType, to: CompareValueType): RealmQuery<M>;
    orBetween(fieldName: keyof M, from: CompareValueType, to: CompareValueType): RealmQuery<M>;

    /**
     * Condition that the value of field begins with the specified string
     *
     * @param fieldName {string}
     * @param value {string}
     * @param casing {boolean, optional} BEGINSWITH[c] or BEGINSWITH
     */
    beginsWith(fieldName: keyof M, value: string, casing?: boolean): RealmQuery<M>;
    orBeginsWith(fieldName: keyof M, value: string, casing?: boolean): RealmQuery<M>;

    /**
     * Condition that value of field contains the specified substring
     *
     * @param fieldName {string}
     * @param value {string}
     * @param casing {boolean, optional} CONTAINS[c] or CONTAINS
     */
    contains(fieldName: keyof M, value: string, casing?: boolean): RealmQuery<M>;
    /**
     * or Condition that value of field contains the specified substring
     *
     * @param fieldName {string}
     * @param value {string}
     * @param casing {boolean, optional} CONTAINS[c] or CONTAINS
     */
    orContains(fieldName: keyof M, value: string, casing?: boolean): RealmQuery<M>;

    /**
     * Condition that the value of field ends with the specified string
     *
     * @param fieldName {string}
     * @param value {string}
     * @param casing {boolean, optional} ENDSWITH[c] or ENDSWITH
     * @return {RealmQuery}
     */
    endsWith(fieldName: keyof M, value: string, casing?: boolean): RealmQuery<M>;
    /**
     * OR Condition that the value of field ends with the specified string
     *
     * @param fieldName {string}
     * @param value {string}
     * @param casing {boolean, optional} ENDSWITH[c] or ENDSWITH
     * @return {RealmQuery}
     */
    orEndsWith(fieldName: keyof M, value: string, casing?: boolean): RealmQuery<M>;
    /**
     * Equal-to comparison
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @return {RealmQuery}
     */
    equalTo(fieldName: keyof M, value: EqualValueType): RealmQuery<M>;
    /**
     * or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @return {RealmQuery}
     */
    orEqualTo(fieldName: keyof M, value: EqualValueType): RealmQuery<M>;

    /**
     * Not-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @return {RealmQuery}
     */
    notEqualTo(fieldName: keyof M, value: EqualValueType): RealmQuery<M>;

    /**
     * OR Equal-to comparison
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @return {RealmQuery}
     */
    orNotEqualTo(fieldName: keyof M, value: EqualValueType): RealmQuery<M>;


    /**
     * Greater-than comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    greaterThan(fieldName: keyof M, value: CompareValueType): RealmQuery<M>;
    /**
     * or Greater-than comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    orGreaterThan(fieldName: keyof M, value: CompareValueType): RealmQuery<M>;
    /**
     * greater-than-or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    greaterThanOrEqualTo(fieldName: keyof M, value: CompareValueType): RealmQuery<M>;
    /**
     * or greater-than-or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    orGreaterThanOrEqualTo(fieldName: keyof M, value: CompareValueType): RealmQuery<M>;
    /**
     * Less-than comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    lessThan(fieldName: keyof M, value: CompareValueType): RealmQuery<M>;
    /**
     * Or Less-than comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    orLessThan(fieldName: keyof M, value: CompareValueType): RealmQuery<M>;
    /**
     * Less-than-or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    lessThanOrEqualTo(fieldName: keyof M, value: CompareValueType): RealmQuery<M>;
    /**
     * OR Less-than-or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    orLessThanOrEqualTo(fieldName: keyof M, value: CompareValueType): RealmQuery<M>;
    /**
     * In comparison
     *
     * @param fieldName {string}
     * @param values {EqualValueType[]}
     * @return {RealmQuery}
     */
    in(fieldName: keyof M, values: EqualValueType[]): RealmQuery<M>;
    orIn(fieldName: keyof M, values: EqualValueType[]): RealmQuery<M>;
    notIn(fieldName: keyof M, values: EqualValueType[]): RealmQuery<M>;
    orNotIn(fieldName: keyof M, values: EqualValueType[]): RealmQuery<M>;
    isEmpty(fieldName: keyof M): RealmQuery<M>;
    isNotEmpty(fieldName: keyof M): RealmQuery<M>;
    orIsEmpty(fieldName: keyof M): RealmQuery<M>;
    orIsNotEmpty(fieldName: keyof M): RealmQuery<M>;
    isNotNull(fieldName: keyof M): RealmQuery<M>;
    orIsNotNull(fieldName: keyof M): RealmQuery<M>;
    isNull(fieldName: keyof M): RealmQuery<M>;

    /**
     *
     * @param fieldName
     * @param value
     */
    like(fieldName: keyof M, value: string): RealmQuery<M>;
    /**
     *
     * @param fieldName
     * @param value
     */
    orLike(fieldName: keyof M, value: string): RealmQuery<M>;

    not(): RealmQuery<M>;
    endNot(): RealmQuery<M>;

    /**
     * Begin grouping of conditions ("left parenthesis")
     */
    beginGroup(): RealmQuery<M>;
    beginOrGroup(): RealmQuery<M>
    /**
     * End grouping of conditions ("right parenthesis") which was opened by a call to beginGroup()
     * @return {RealmQuery}
     */
    endGroup(): RealmQuery<M>;

    group(cb: groupCallback ): RealmQuery<M>

    /**
     * Combine to another query
     */
    join(query: any): RealmQuery<M>;
    /**
     * Create new query
     * @param objects {Realm.Collection}
     */
    static query<M>(objects: Results<M>): RealmQuery<M>;
}
export default RealmQuery;
