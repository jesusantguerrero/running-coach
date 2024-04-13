<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://zen.vercel.app/">
  </a>

  <h3 align="center" style="color:green"><strong>Neat</strong>Coach.</h3>

  <p align="center">
    Run smart.
    <br />
</p>


<!-- ABOUT THE PROJECT -->
## About NeatCoach.
__NeatCoach__  is a smart running coach. It will take a distance and minutes and Build well structured a training plan to run the entered distance in the desired minutes by the end of the last week of the training plan.

It will include speed work, tempo runs, and long runs in the plan as suggested by experts.

Additionally, you can save a plan and update your progress on them.

![Zen. Screen Shot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qjb6vbxshilb9kyj3d1s.png)

## Demo

[Live demo](https://neatcoach.pages.dev/)
## Journey

One of my main hobbies is running, I've been training and participating in local 5k races for a couple of years now and I am always looking for training plans to improve my record.

I went through the documentation on workers and pages and followed the instructions to do the project, which was pretty straightforward.

I went to the [Model playground](https://playground.ai.cloudflare.com/) to test and modify the prompt until I got the output structure I had in mind.

**What model do I use?**

`@cf/meta/llama-2-7b-chat-int8`

**What I learned?**

- To create Cloudflare Pages and Workers and to add bindings.
- Even though I just used one I explored multiple models and tried its capabilities as well as how to use @cloudflare/ai package

**What's next?**

- Allow users to store plans online using a DB
- Train the AI to obtain better plans and take more user inputs like the current pace.
- Add more widgets.
### Built With

I used the following.

* [Vue 3](https://v3.vuejs.org/)
* [Vite](https://vitejs.dev/)
* [Tailwindcss](https://tailwindcss.com/)
* [Cloudflare Pages](https://pages.cloudflare.com/)
* [Open Models](https://developers.cloudflare.com/workers-ai/models/)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

| Prerequisite                                          | Version |
| ------------------------------------------------------| ------- |
| [Node.js](http://nodejs.org)                          | `~ ^v20.9.0`  |
| [Cloudflare account](https://www.cloudflare.com/)                                |    --   |

```shell
node -v
```
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jesusantguerrero/running-coach.git neatcoach
   ```
2. Install NPM packages
   ```sh
   cd neatcoach
   npm install
   ```


3. Run preview
   ```sh
   npm run preview
   ```

3. Build
   ```sh
   npm run build
   ```

<!-- USAGE EXAMPLES -->



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.
