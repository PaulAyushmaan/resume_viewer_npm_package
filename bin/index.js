#!/usr/bin/env node

import chalk from "chalk";
import boxen from "boxen";
import gradient from "gradient-string";
import figlet from "figlet";
import inquirer from "inquirer";
import ora from "ora";
import { createSpinner } from "nanospinner";

// Color gradients
const nameGradient = gradient(['#FF6B6B', '#4ECDC4', '#45B7D1']);
const titleGradient = gradient(['#96CEB4', '#FFEAA7', '#DDA0DD']);
const sectionGradient = gradient(['#74b9ff', '#0984e3']);
const skillGradient = gradient(['#00b894', '#00cec9']);
const projectGradient = gradient(['#fd79a8', '#fdcb6e']);

// ASCII Art Header
const createHeader = () => {
  const name = figlet.textSync('AYUSHMAAN', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  });
  
  const subtitle = figlet.textSync('PAUL', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  });

  return nameGradient(name) + '\n' + nameGradient(subtitle);
};

// Progress bars for skills
const createSkillBar = (skill, level) => {
  const totalBars = 10;
  const filledBars = Math.round((level / 100) * totalBars);
  const emptyBars = totalBars - filledBars;
  
  const filled = chalk.green('█'.repeat(filledBars));
  const empty = chalk.gray('░'.repeat(emptyBars));
  
  return `${skill.padEnd(15)} ${filled}${empty} ${level}%`;
};

// Animated typing effect
const typeWriter = async (text, delay = 0) => {
  for (let i = 0; i <= text.length; i++) {
    process.stdout.write('\r' + text.substring(0, i));
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  console.log('');
};

// Main resume content
const resumeContent = () => {
  const header = createHeader();
  
  const personalInfo = boxen(
    `${chalk.bold.cyan('📧')} ${chalk.white('ayushmaanpaul2004@gmail.com')}\n` +
    `${chalk.bold.cyan('📱')} ${chalk.white('+91 74393 87013')}\n` +
    `${chalk.bold.cyan('📍')} ${chalk.white('Kolkata, West Bengal')}\n` +
    `${chalk.bold.cyan('🌐')} ${chalk.blue.underline('https://ayushmaanpaul.vercel.app')}\n` +
    `${chalk.bold.cyan('💼')} ${chalk.blue.underline('linkedin.com/in/paulayushmaan')}\n` +
    `${chalk.bold.cyan('👨‍💻')} ${chalk.blue.underline('github.com/PaulAyushmaan')}`,
    {
      title: '📋 CONTACT INFO',
      titleAlignment: 'center',
      padding: 1,
      margin: 1,
      borderStyle: 'double',
      borderColor: 'cyan'
    }
  );

  const education = boxen(
    `${chalk.bold.yellow('🎓 B.Tech Computer Science & Engineering')}\n` +
    `   ${chalk.white('Techno Engineering College Banipur (2021-2025)')}\n` +
    `   ${chalk.green('CGPA: 9.07/10.0')} ${chalk.yellow('⭐')}\n\n` +
    `${chalk.bold.yellow('📚 Higher Secondary & Secondary')}\n` +
    `   ${chalk.white('Barasat P.C.S Govt. High School')}\n` +
    `   ${chalk.green('H.S: 88.4%')} | ${chalk.green('Sec: 87.71%')}`,
    {
      title: '🎓 EDUCATION',
      titleAlignment: 'center',
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'yellow'
    }
  );

  const skills = boxen(
    `${chalk.bold.magenta('💻 TECHNICAL SKILLS')}\n\n` +
    `${createSkillBar('Python', 90)}\n\n` +
    `${createSkillBar('JavaScript', 85)}\n\n` +
    `${createSkillBar('FastAPI', 88)}\n\n` +
    `${createSkillBar('React.js', 82)}\n\n` +
    `${createSkillBar('Node.js', 80)}\n\n` +
    `${createSkillBar('MongoDB', 85)}\n\n` +
    `${createSkillBar('Git/GitHub', 90)}\n\n` +
    `${createSkillBar('AWS', 50)}\n\n` +
    `${chalk.bold.cyan('🛠️ TOOLS & FRAMEWORKS')}\n` +
    `${chalk.white('Backend:')} ${chalk.green('FastAPI • Node.js • Express.js')}\n` +
    `${chalk.white('Frontend:')} ${chalk.blue('React.js • Tailwind • HTML/CSS')}\n` +
    `${chalk.white('Database:')} ${chalk.yellow('MongoDB • MySQL')}\n` +
    `${chalk.white('DevOps:')} ${chalk.red('AWS • Vercel • Netlify • Docker')}\n` +
    `${chalk.white('Testing:')} ${chalk.magenta('Postman • Jest')}\n` +
    `${chalk.white('Scraping:')} ${chalk.cyan('BeautifulSoup • Requests')}`,
    {
      title: '⚡ SKILLS MATRIX',
      titleAlignment: 'center',
      padding: 1,
      margin: 1,
      borderStyle: 'classic',
      borderColor: 'magenta'
    }
  );

  const experience = boxen(
    `${chalk.bold.red('🚀 SOFTWARE DEVELOPMENT ENGINEER INTERN')}\n` +
    `${chalk.yellow('Crawfield & Dutton Enterprise Solutions Pvt Ltd')}\n` +
    `${chalk.gray('Dec 2024 - May 2025 | Kolkata, WB')}\n\n` +
    `${chalk.green('✨ KEY ACHIEVEMENTS:')}\n` +
    `${chalk.white('•')} Built ${chalk.bold('KYC Fabric')} - Production backend system\n` +
    `${chalk.white('•')} Served ${chalk.bold.green('10K+ users/month')} with ${chalk.bold.green('99.9% uptime')}\n` +
    `${chalk.white('•')} Verified ${chalk.bold.blue('8+ official IDs')} (PAN, Aadhaar, Voter, etc.)\n` +
    `${chalk.white('•')} Used by ${chalk.bold.yellow('20+ client organizations')}\n` +
    `${chalk.white('•')} Increased verification speed by ${chalk.bold.green('60%')}\n` +
    `${chalk.white('•')} Implemented ${chalk.bold.cyan('JWT authentication')} & security\n` +
    `${chalk.white('•')} Automated data extraction with ${chalk.bold.magenta('web scraping')}`,
    {
      title: '💼 PROFESSIONAL EXPERIENCE',
      titleAlignment: 'center',
      padding: 1,
      margin: 1,
      borderStyle: 'double',
      borderColor: 'red'
    }
  );

  const projects = boxen(
    `${chalk.bold.cyan('🌟 FEATURED PROJECTS')}\n\n` +
    
    `${chalk.bold.yellow('1. 🔐 KYC Fabric - Identity Verification System')}\n` +
    `   ${chalk.white('Tech:')} FastAPI • MongoDB • JWT • BeautifulSoup\n` +
    `   ${chalk.green('🔗')} ${chalk.blue.underline('https://kyc-fabric.crawfieldanddutton.com/')}\n\n` +
    
    `${chalk.bold.yellow('2. 🚗 Destini - Smart Cab Platform')}\n` +
    `   ${chalk.white('Tech:')} MERN Stack • Role-based Access • Real-time Logic\n` +
    `   ${chalk.green('🔗')} ${chalk.blue.underline('https://github.com/PaulAyushmaan/destini')}\n\n` +
    
    `${chalk.bold.yellow('3. 💰 Expense Management System')}\n` +
    `   ${chalk.white('Tech:')} React • Node.js • MongoDB • Ant Design\n` +
    `   ${chalk.green('🔗')} ${chalk.blue.underline('https://expense-management-system-go4a.vercel.app/')}\n\n` +
    
    `${chalk.bold.yellow('4. 🎨 Developer Portfolio')}\n` +
    `   ${chalk.white('Tech:')} React • Tailwind • 3D Visuals • Animations\n` +
    `   ${chalk.green('🔗')} ${chalk.blue.underline('https://ayushmaanpaul.vercel.app/')}\n\n` +
    
    `${chalk.bold.yellow('5. 🏆 Sportivo 4.0 - College Sports Platform')}\n` +
    `   ${chalk.white('Tech:')} Vanilla JS • Google Forms API • 500+ Users\n` +
    `   ${chalk.green('🔗')} ${chalk.blue.underline('https://sportivo-4.netlify.app/')}`,
    {
      title: '🚀 PROJECT SHOWCASE',
      titleAlignment: 'center',
      padding: 1,
      margin: 1,
      borderStyle: 'bold',
      borderColor: 'cyan'
    }
  );

  const achievements = boxen(
    `${chalk.bold.green('🏆 ACHIEVEMENTS & HIGHLIGHTS')}\n\n` +
    `${chalk.yellow('🎯')} Maintained ${chalk.bold.green('CGPA 9.07')} throughout B.Tech\n` +
    `${chalk.yellow('🎯')} Built production systems serving ${chalk.bold.blue('10K+ users')}\n` +
    `${chalk.yellow('🎯')} Contributed to ${chalk.bold.cyan('BFSI domain')} identity verification\n` +
    `${chalk.yellow('🎯')} Developed ${chalk.bold.magenta('5+ full-stack applications')}\n` +
    `${chalk.yellow('🎯')} Expertise in ${chalk.bold.red('web scraping')} & automation\n` +
    `${chalk.yellow('🎯')} Strong foundation in ${chalk.bold.yellow('OOP')} & ${chalk.bold.yellow('DBMS')}\n` +
    `${chalk.yellow('🎯')} Active contributor on ${chalk.bold.white('GitHub')}`,
    {
      title: '⭐ ACHIEVEMENTS',
      titleAlignment: 'center',
      padding: 1,
      margin: 1,
      borderStyle: 'double',
      borderColor: 'green'
    }
  );

  const footer = boxen(
    `${titleGradient('🚀 Ready to build amazing things together!')}\n` +
    `${chalk.gray('Generated with')} ${chalk.red('❤️')} ${chalk.gray('using Node.js CLI')}\n` +
    `${chalk.gray('Last updated:')} ${chalk.cyan(new Date().toLocaleDateString())}`,
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'white',
      backgroundColor: 'black'
    }
  );

  return {
    header,
    personalInfo,
    education,
    skills,
    experience,
    projects,
    achievements,
    footer
  };
};

// Interactive menu
const showInteractiveMenu = async () => {
  const spinner = createSpinner('Loading interactive resume...').start();
  await new Promise(resolve => setTimeout(resolve, 1500));
  spinner.success({ text: 'Resume loaded successfully!' });

  const { section } = await inquirer.prompt([
    {
      type: 'list',
      name: 'section',
      message: 'Which section would you like to explore?',
      choices: [
        { name: '👤 Personal Information', value: 'personal' },
        { name: '🎓 Education', value: 'education' },
        { name: '⚡ Skills & Technologies', value: 'skills' },
        { name: '💼 Professional Experience', value: 'experience' },
        { name: '🚀 Projects Portfolio', value: 'projects' },
        { name: '🏆 Achievements', value: 'achievements' },
        { name: '📄 Complete Resume', value: 'complete' },
        { name: '❌ Exit', value: 'exit' }
      ]
    }
  ]);

  const content = resumeContent();

  switch (section) {
    case 'personal':
      console.log(content.personalInfo);
      break;
    case 'education':
      console.log(content.education);
      break;
    case 'skills':
      console.log(content.skills);
      break;
    case 'experience':
      console.log(content.experience);
      break;
    case 'projects':
      console.log(content.projects);
      break;
    case 'achievements':
      console.log(content.achievements);
      break;
    case 'complete':
      console.log(content.header);
      console.log(content.personalInfo);
      console.log(content.education);
      console.log(content.skills);
      console.log(content.experience);
      console.log(content.projects);
      console.log(content.achievements);
      console.log(content.footer);
      break;
    case 'exit':
      console.log(chalk.green('Thanks for viewing my resume! 👋'));
      process.exit(0);
  }

  // Ask if they want to continue
  const { continue: cont } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: 'Would you like to explore another section?',
      default: true
    }
  ]);

  if (cont) {
    await showInteractiveMenu();
  } else {
    console.log(content.footer);
    process.exit(0);
  }
};

// Main execution
const main = async () => {
  console.clear();
  
  // Welcome animation
  const welcomeSpinner = ora({
    text: 'Initializing Ayushmaan\'s Digital Resume...',
    spinner: 'dots12'
  }).start();
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  welcomeSpinner.succeed('Welcome to my interactive CLI resume!');
  
  console.log('\n');
  console.log(titleGradient('🌟 Full-Stack Developer | Backend Specialist | Product-Focused Developer | Tech Explorer 🌟'));
  console.log('\n');

  const { mode } = await inquirer.prompt([
    {
      type: 'list',
      name: 'mode',
      message: 'How would you like to view my resume?',
      choices: [
        { name: '🎮 Interactive Mode (Explore sections)', value: 'interactive' },
        { name: '📄 Quick View (Complete resume)', value: 'quick' },
        { name: '⚡ Lightning Mode (Compact view)', value: 'compact' }
      ]
    }
  ]);

  const content = resumeContent();

  switch (mode) {
    case 'interactive':
      await showInteractiveMenu();
      break;
    case 'quick':
      console.log(content.header);
      console.log(content.personalInfo);
      console.log(content.education);
      console.log(content.skills);
      console.log(content.experience);
      console.log(content.projects);
      console.log(content.achievements);
      console.log(content.footer);
      break;
    case 'compact':
      console.log(nameGradient('AYUSHMAAN PAUL - Full Stack Developer'));
      console.log(chalk.cyan('📧 ayushmaanpaul2004@gmail.com | 📱 +91 74393 87013'));
      console.log(chalk.yellow('🎓 B.Tech CSE (9.07 CGPA) | 💼 SDE Intern @ Crawfield & Dutton'));
      console.log(chalk.green('💻 Python • FastAPI • React.js • MongoDB • AWS'));
      console.log(chalk.blue('🚀 Built KYC system (10K+ users) • 5+ Full-stack projects'));
      console.log(chalk.magenta('🔗 Portfolio: https://ayushmaanpaul.vercel.app'));
      break;
  }
};

// Error handling
process.on('uncaughtException', (error) => {
  console.log(chalk.red('❌ An error occurred:'), error.message);
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log(chalk.yellow('\n👋 Thanks for checking out my resume! Goodbye!'));
  process.exit(0);
});

// Run the application
main().catch(console.error);
