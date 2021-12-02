import {createPullRequestAPI, PullRequestAPI} from './PullRequestsAPI'
import * as github from '@actions/github'
import * as core from '@actions/core'

export class Action {
  constructor(private api: PullRequestAPI, private userName: string) {}

  async perform() {
    let pullRequests = await this.api.listPullRequests()
    let filtered = pullRequests.filter((pr) => pr.user?.login == this.userName)
    // do some stuff here
  }
}

export function createAction(): Action {
  let token = core.getInput("token")
  const git = github.getOctokit(token)
  let owner = github.context.repo.owner
  let repo = github.context.repo.repo
  let username = core.getInput("username")
  let api = createPullRequestAPI(git, owner, repo)
  return new Action(api, username)
}