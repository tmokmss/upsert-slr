# Upsert Service Linked Role

## Usage

```sh
npm i upsert-slr
```

```ts
new ServiceLinkedRole(this, 'ElasticsearchSlr', {
    awsServiceName: 'es.amazonaws.com',
    description: 'Service linked role for Elasticsearch',
});
```
