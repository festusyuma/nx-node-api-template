import { SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

let secretClient: SecretsManagerClient;

export function getSecretClient() {
  if (!secretClient)
    secretClient = new SecretsManagerClient({
      region: process.env.AWS_REGION,
    });

  return secretClient;
}
