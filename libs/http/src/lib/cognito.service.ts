import {
  CognitoIdentityProviderClient,
  GetUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CognitoService extends CognitoIdentityProviderClient {
  constructor(region?: string) {
    super({ region });
  }

  async getUser(token: string) {
    const command = new GetUserCommand({
      AccessToken: token,
    });

    const res = await this.send(command);
    const attributes: Record<string, unknown> = {};

    for (const attribute of res.UserAttributes ?? []) {
      const attributeName = attribute.Name;
      if (!attributeName) continue;

      attributes[attributeName] = attribute.Value;
    }

    return { email: res.Username, ...attributes };
  }
}
