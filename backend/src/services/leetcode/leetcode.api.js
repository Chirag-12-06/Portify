import axios from "axios";

const query = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username

      profile {
        realName
        aboutMe
        userAvatar
        ranking
      }

      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }

        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }

      userCalendar {
        streak
        totalActiveDays
        submissionCalendar
      }

      badges {
        id
        name
        displayName
        icon
        creationDate
      }

      languageProblemCount {
        languageName
        problemsSolved
      }

      tagProblemCounts {
        advanced {
          tagName
          problemsSolved
        }

        intermediate {
          tagName
          problemsSolved
        }

        fundamental {
          tagName
          problemsSolved
        }
      }
    }

    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
    }

    userContestRankingHistory(username: $username) {
      attended
      rating
      ranking
      problemsSolved

      contest {
        title
        startTime
      }
    }
  }
`;

export async function getLeetcodeProfile(username) {
  const data = await axios.post(
    "https://leetcode.com/graphql",
    {
      query,
      variables: {
        username,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return data.data;
}
