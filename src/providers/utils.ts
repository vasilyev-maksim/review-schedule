import { Provider } from '../enums';
import { githubProvider } from './githubProvider';
import { IProvider } from './models';
import { slackProvider } from './slackProvider';

export function getProvider (provider: Provider): IProvider {
    return {
        [Provider.GitHub]: githubProvider,
        [Provider.Slack]: slackProvider,
    }[provider];
}
