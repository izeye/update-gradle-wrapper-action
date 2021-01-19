// Copyright 2020-2021 Cristian Greco
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {getInputs} from './inputs';
import {GitHubApi} from './github/gh-api';
import {PostAction} from './tasks/post';
import {runMain} from './tasks/main';
import * as store from './store';

if (!store.mainActionExecuted()) {
  runMain();
} else {
  const pullRequestData = store.getPullRequestData();

  if (pullRequestData) {
    const githubApi = new GitHubApi(getInputs().repoToken);
    new PostAction(githubApi, pullRequestData).run();
  }
}
