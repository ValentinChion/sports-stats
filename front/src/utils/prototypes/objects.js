/**
 * Prototypes that can be applied to multiple type of objects.s
 */

// For local storage. If results of a function is a string, it's a catched error, otherwise it is not.
String.prototype.isError = true;
Boolean.prototype.isError = false;
Number.prototype.isError = false;
Object.prototype.isError = false;
Array.prototype.isError = false;