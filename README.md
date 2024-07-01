# Contributing

This project has been refactored to work with Yeoman yo v5.0.0. It resolves the Generator.run is not a function error

# Azure Terraform Module Generator

`generator-hac-tf-module` creates base template to start a new terraform module along with terratest for automatically testing the module.

![Terraform module template walkthrough](/doc/scaffolding.934x477.gif)

## Prerequisites

1. Install latest [Node LTS](https://nodejs.org).
2. `npm install -g yo`
3. ~~`npm install -g generator-az-terra-module`~~
3. Clone this repository to your machine
4. On the command line, from the root of this project run `npm link`

## Usage

```
$ yo hac-tf-module
```

***NOTE:** This template will generate files in the **current directory**, so be sure to always run it against a new directory.*

## Set Service Principal of Azure for Terraform

- [Configure Azure Service Principal](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/terraform-install-configure)

## Prepare for Native Run

If you're a big fan of everything in native, please run the below script to set up the environment:

```bash
$ sudo ./env_setup.sh
```

## Prepare for Docker Run

If you're a big fan of using Docker containers, please follow the instructions below to quickly set up a Docker container. Not a big fan of Docker containers, that's OK too, you can choose to exclude the Dockerfile from your project template.

```bash
$ docker build --build-arg BUILD_ARM_SUBSCRIPTION_ID=$ARM_SUBSCRIPTION_ID --build-arg BUILD_ARM_CLIENT_ID=$ARM_CLIENT_ID --build-arg BUILD_ARM_CLIENT_SECRET=$ARM_CLIENT_SECRET --build-arg BUILD_ARM_TENANT_ID=$ARM_TENANT_ID -t terra-mod-example .
$ docker run -it terra-mod-example /bin/sh
```

## Build module

```
$ bundle install
$ rake build
```

## Run module

```
$ terraform init
$ terraform plan
$ terraform apply
```

## Test module

```
$ rake e2e
```
