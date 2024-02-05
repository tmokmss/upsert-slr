import { awscdk } from 'projen';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'tmokmss',
  authorAddress: 'tmokmss@users.noreply.github.com',
  majorVersion: 1,
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: 'upsert-slr',
  license: 'MIT',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/tmokmss/upsert-slr.git',
  description: 'Manage AWS service-linked roles in a better way.',
  keywords: ['aws', 'cdk', 'iam', 'aws-cdk'],
  eslintOptions: {
    dirs: ['src'],
    ignorePatterns: ['example/**/*', 'lambda/**/*', 'test/assets/**/*', 'test/*.snapshot/**/*', '*.d.ts'],
  },
  publishToPypi: {
    distName: 'upsert-slr',
    module: 'upsert_slr',
  },
  gitignore: ['*.js', '*.d.ts', '!test/integ.*.snapshot/**/*', 'test/cdk.out'],
  devDeps: ['aws-cdk@^2.38.0', 'aws-cdk-lib@^2.38.0', 'constructs@^10.0.5', '@aws-cdk/integ-runner', '@aws-cdk/integ-tests-alpha'],
  peerDependencyOptions: {
    pinnedDevDependency: false,
  },
});

// Bundle custom resource handler Lambda code
project.projectBuild.compileTask.prependExec('yarn install --frozen-lockfile && yarn build', {
  cwd: 'lambda',
});
// Run integ-test
project.projectBuild.testTask.exec('yarn integ-runner');
project.synth();
