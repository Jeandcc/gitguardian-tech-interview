export type TSecretType =
  | "AWS Credential Key"
  | "Environment configuration file"
  | "Username and password in URI"
  | "Django configuration file"
  | "Github Key"
  | "Google OAuth Key"
  | "SSH Key";

export interface IScannedSecret {
  secretType: TSecretType;
  commitMessage: string;
  time: number;
}

export interface IScanningStats {
  secretsFound: number;
  repositoriesSearched: number;
  filesProcessed: number;
  mbSizeOfCodeScanned: number;
}
