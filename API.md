# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ServiceLinkedRole <a name="ServiceLinkedRole" id="upsert-slr.ServiceLinkedRole"></a>

#### Initializers <a name="Initializers" id="upsert-slr.ServiceLinkedRole.Initializer"></a>

```typescript
import { ServiceLinkedRole } from 'upsert-slr'

new ServiceLinkedRole(scope: Construct, id: string, props: ServiceLinkedRoleProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#upsert-slr.ServiceLinkedRole.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#upsert-slr.ServiceLinkedRole.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#upsert-slr.ServiceLinkedRole.Initializer.parameter.props">props</a></code> | <code><a href="#upsert-slr.ServiceLinkedRoleProps">ServiceLinkedRoleProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="upsert-slr.ServiceLinkedRole.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="upsert-slr.ServiceLinkedRole.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="upsert-slr.ServiceLinkedRole.Initializer.parameter.props"></a>

- *Type:* <a href="#upsert-slr.ServiceLinkedRoleProps">ServiceLinkedRoleProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#upsert-slr.ServiceLinkedRole.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="upsert-slr.ServiceLinkedRole.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#upsert-slr.ServiceLinkedRole.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="upsert-slr.ServiceLinkedRole.isConstruct"></a>

```typescript
import { ServiceLinkedRole } from 'upsert-slr'

ServiceLinkedRole.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="upsert-slr.ServiceLinkedRole.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#upsert-slr.ServiceLinkedRole.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="upsert-slr.ServiceLinkedRole.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### ServiceLinkedRoleProps <a name="ServiceLinkedRoleProps" id="upsert-slr.ServiceLinkedRoleProps"></a>

#### Initializer <a name="Initializer" id="upsert-slr.ServiceLinkedRoleProps.Initializer"></a>

```typescript
import { ServiceLinkedRoleProps } from 'upsert-slr'

const serviceLinkedRoleProps: ServiceLinkedRoleProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#upsert-slr.ServiceLinkedRoleProps.property.awsServiceName">awsServiceName</a></code> | <code>string</code> | The service principal for the AWS service to which this role is attached. |
| <code><a href="#upsert-slr.ServiceLinkedRoleProps.property.description">description</a></code> | <code>string</code> | The description of the role. |

---

##### `awsServiceName`<sup>Required</sup> <a name="awsServiceName" id="upsert-slr.ServiceLinkedRoleProps.property.awsServiceName"></a>

```typescript
public readonly awsServiceName: string;
```

- *Type:* string

The service principal for the AWS service to which this role is attached.

You use a string similar to a URL but without the http:// in front. For example: elasticbeanstalk.amazonaws.com .

Service principals are unique and case-sensitive. To find the exact service principal for your service-linked role, see AWS services that work with IAM in the IAM User Guide. Look for the services that have Yes in the Service-Linked Role column. Choose the Yes link to view the service-linked role documentation for that service.
https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html

---

##### `description`<sup>Optional</sup> <a name="description" id="upsert-slr.ServiceLinkedRoleProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

The description of the role.

This is only used when creating a new role.
When there is an existing role for the aws service, this field is ignored.

---



