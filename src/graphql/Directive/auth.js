const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver } = require("graphql");

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    // console.log(field.name, details.objectType._authFieldsWrapped)
    field._requiredAuthRole = this.args.requires;
  }

  visitObject(object){
    // console.log(object)
  }

  ensureFieldsWrapped(objectType) {
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();
    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function (...args) {
        const requiredRole =
          field._requiredAuthRole ||
          objectType._requiredAuthRole;

        if (! requiredRole) {
          return resolve.apply(this, args);
        }
        console.log(args[2])

        return resolve.apply(this, args);
      }
    })
  }
}

module.exports = AuthDirective;