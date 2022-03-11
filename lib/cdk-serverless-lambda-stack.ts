import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class CdkServerlessLambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'Table', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'TableName',
    });

    const dynamodbLambda = new lambda.Function(this, 'DynamoDBHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('functions'),
      handler: 'lambda.handler',
      environment: {
        TABLE_NAME: table.tableName,
      },
    });
    table.grantReadWriteData(dynamodbLambda);

    const api = new apigw.RestApi(this, 'api-endpoint', {
      restApiName: 'api-endpoint-name',
    });

    api.root
      .resourceForPath('hello')
      .addMethod('GET', new apigw.LambdaIntegration(dynamodbLambda));

    new cdk.CfnOutput(this, 'HTTP URL', {
      value: api.url ?? 'Something went wrong',
    });
  }
}
