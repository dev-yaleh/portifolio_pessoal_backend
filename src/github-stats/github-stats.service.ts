import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface GithubStats {
  totalRepos: number;
  totalCommits: number;
  coffees: number; // dias distintos com pelo menos 1 commit
}

const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 horas — evita bater no rate limit do GitHub

@Injectable()
export class GithubStatsService {
  private cache: { data: GithubStats; expiresAt: number } | null = null;

  async getStats(): Promise<GithubStats> {
    if (this.cache && this.cache.expiresAt > Date.now()) {
      return this.cache.data;
    }

    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;
    const headers = { Authorization: `Bearer ${token}` };
    const currentYear = new Date().getFullYear();
    const startYear = Number(process.env.GITHUB_START_YEAR) || currentYear - 3;

    // 1) Repositórios públicos, não-fork (projetos "seus", publicados)
    const reposQuery = `
      query($login: String!) {
        user(login: $login) {
          repositories(privacy: PUBLIC, isFork: false) {
            totalCount
          }
        }
      }
    `;
    const reposRes = await axios.post(
      'https://api.github.com/graphql',
      { query: reposQuery, variables: { login: username } },
      { headers },
    );
    const totalRepos = reposRes.data.data.user.repositories.totalCount;

    // 2) Commits + dias distintos com commit, ano a ano
    // (o GraphQL do GitHub só entrega o calendário de contribuições em janelas de até 1 ano)
    let totalCommits = 0;
    let activeDays = 0;

    for (let year = startYear; year <= currentYear; year++) {
      const from = `${year}-01-01T00:00:00Z`;
      const to = `${year}-12-31T23:59:59Z`;

      const query = `
        query($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              totalCommitContributions
              contributionCalendar {
                weeks {
                  contributionDays {
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `;

      const { data } = await axios.post(
        'https://api.github.com/graphql',
        { query, variables: { login: username, from, to } },
        { headers },
      );

      const collection = data.data.user.contributionsCollection;
      totalCommits += collection.totalCommitContributions;

      for (const week of collection.contributionCalendar.weeks) {
        for (const day of week.contributionDays) {
          if (day.contributionCount > 0) activeDays++;
        }
      }
    }

    const stats: GithubStats = { totalRepos, totalCommits, coffees: activeDays };
    this.cache = { data: stats, expiresAt: Date.now() + CACHE_TTL_MS };
    return stats;
  }
}