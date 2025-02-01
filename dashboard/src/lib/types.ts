export type Repository = {
  name: string
  full_name: string
  repository_link: string

  repository_security_details: RepositorySecurityDetails
  repository_has_files: RepositoryHasFiles
}

export type RepositorySecurityDetails = {
  secret_scanning_push_protection: boolean
  secret_scanning: boolean
  dependabot_security_updates: boolean
  private_vulnerability_disclosures: boolean
  code_scanning_alerts: number
}

export type RepositoryHasFiles = {
  has_security_policy: boolean
  has_code_of_conduct: boolean
  has_contributing: boolean
  has_readme: boolean
  has_project_technologies: boolean
  has_license: boolean
}

export type FlatSecurityRepositoryDetails = Repository & RepositorySecurityDetails
export type FlatRepositoryDetails = Repository & RepositoryHasFiles
