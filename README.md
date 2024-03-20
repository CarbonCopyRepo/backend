#### CU ATLS 4214/5214 - Big Data Architecture - Course Project - Backend

##### Deployment Info:

###### Terraform provider service account:

- In the `provider.tf` file we have a variable named `gcp_terraform_sa`. The value of this variable will come from GitHub action
secret when the CI/CD pipeline runs. 


- To test it locally we need to create a service account for terraform on GCP with the roles: 
  - Artifact Registry Create-on-Push Repository Administrator
  - Compute Viewer
  - Kubernetes Engine Admin
  - Project IAM Admin
  - Service Account Admin
  - Service Account User

  
- Once the service account is created, generate the credentials file by creating a new json key.

- Download the key and reference it in the `provider.tf` file by replacing `credentials = var.gcp_terraform_sa` with `credentials = file('path_to_json_credentials_file')`

- If we do not want to test locally, leave it as such, GitHub actions will handle the rest.

- Basic Terraform Commands (For Quick Reference):
  - `terraform init` - Run this first to initialize the backend config
  - `terraform plan -var-file="variables.tfvars"` - To see what resources terraform will create
  - `terraform apply -var-file="variables.tfvars"` - Instruct terraform to create the resources on GCP
  - `terraform destroy` - Instruct terraform to destroy all created resources in GCP

##### Resources:
 - How To:
   - [Node.js + Express + TypeScript setup](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)
   - [ESLint + Prettier setup](https://blog.tericcabrel.com/set-up-a-nodejs-project-with-typescript-eslint-and-prettier/)

   
 - Style Guides / Best Practices / Cheatsheets:
   - [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
   - [Quick Reference for common TypeScript types](https://github.com/DefinitelyTyped/DefinitelyTyped)

   
 - Testing:
   - For Unit and Integration Testing we plan to use the [Jest Framework](https://jestjs.io/docs/getting-started)
   - For Testing API endpoints, we use [Supertest](https://www.npmjs.com/package/supertest)
   - The idea is to group the tests by their feature as denoted by the tests folder under user inside src (just an example)
   - [Setup Jest, Supertest with TypeScript](https://javascript.plainenglish.io/complete-node-js-testing-setup-with-jest-supertest-typescript-and-husky-e9d3fa109e1d)
   - [Supertest docs](https://www.npmjs.com/package/supertest)
   - [Jest + Supertest examples](https://medium.com/@natnael.awel/how-to-setup-testing-for-typescript-with-express-js-example-83d3efbb6fd4)
   - [Jest Config Isolated Modules option turned on](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/isolatedModules/)
   - [Extended Jest Docs](https://jest-extended.jestcommunity.dev/docs/matchers/)

 - Axios:
   - [Request Config Options](https://axios-http.com/docs/req_config)

 - Terraform / CI-CD / Deployment:
   - [Push Docker Image to GCR with GitHub Actions](https://www.youtube.com/watch?v=6dLHcnlPi_U)
   - [Node.js backend on GKE with GCP - Basics](https://www.youtube.com/watch?v=eCHwm2l-GR8)
   - [Node.js backend on GKE with GCP - Advanced Config (VPC, Subnets etc)](https://youtu.be/X_IK0GBbBTw?si=B13m8C-ZMjXzObng)

 - Miscellaneous:
   - [Enabling ESLint on VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   - [Enabling Prettier on VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)