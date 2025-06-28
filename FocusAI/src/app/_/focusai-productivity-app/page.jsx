"use client";
import React from "react";

function MainComponent() {
  const [currentScreen, setCurrentScreen] = React.useState("onboarding");
  const [onboardingStep, setOnboardingStep] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState("dashboard");

  // Timer state
  const [timerMode, setTimerMode] = React.useState("focus"); // focus, shortBreak, longBreak
  const [timeLeft, setTimeLeft] = React.useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = React.useState(false);
  const [sessionCount, setSessionCount] = React.useState(0);
  const [totalFocusTime, setTotalFocusTime] = React.useState(0);

  // Tasks state
  const [tasks, setTasks] = React.useState([
    {
      id: 1,
      text: "Complete project proposal",
      category: "Work",
      completed: false,
      priority: "high",
    },
    {
      id: 2,
      text: "Review team feedback",
      category: "Work",
      completed: true,
      priority: "medium",
    },
    {
      id: 3,
      text: "Plan weekend activities",
      category: "Personal",
      completed: false,
      priority: "low",
    },
  ]);
  const [newTask, setNewTask] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Work");

  // AI recommendations
  const [aiRecommendations, setAiRecommendations] = React.useState([]);
  const [loadingRecommendations, setLoadingRecommendations] =
    React.useState(false);

  // Analytics data
  const [weeklyData, setWeeklyData] = React.useState([
    { day: "Mon", minutes: 120 },
    { day: "Tue", minutes: 90 },
    { day: "Wed", minutes: 150 },
    { day: "Thu", minutes: 180 },
    { day: "Fri", minutes: 200 },
    { day: "Sat", minutes: 60 },
    { day: "Sun", minutes: 45 },
  ]);

  // Dynamic Island notification
  const [dynamicIslandVisible, setDynamicIslandVisible] = React.useState(false);
  const [dynamicIslandText, setDynamicIslandText] = React.useState("");

  // Timer durations
  const timerDurations = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  // Timer effect
  React.useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    if (timerMode === "focus") {
      setSessionCount((prev) => prev + 1);
      setTotalFocusTime((prev) => prev + 25);
      showDynamicIslandNotification(
        "Focus session complete! Time for a break."
      );
      // Auto switch to break
      const nextMode = sessionCount % 4 === 3 ? "longBreak" : "shortBreak";
      setTimerMode(nextMode);
      setTimeLeft(timerDurations[nextMode]);
    } else {
      showDynamicIslandNotification("Break time over! Ready to focus?");
      setTimerMode("focus");
      setTimeLeft(timerDurations.focus);
    }
  };

  const showDynamicIslandNotification = (text) => {
    setDynamicIslandText(text);
    setDynamicIslandVisible(true);
    setTimeout(() => setDynamicIslandVisible(false), 4000);
  };

  const startTimer = () => {
    setIsRunning(true);
    showDynamicIslandNotification(
      `${timerMode === "focus" ? "Focus" : "Break"} session started!`
    );
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerDurations[timerMode]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        category: selectedCategory,
        completed: false,
        priority: "medium",
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getAIRecommendations = async () => {
    setLoadingRecommendations(true);
    try {
      const response = await fetch("/integrations/google-gemini-1-5/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Based on this productivity data, provide 3 personalized focus recommendations:
            - Total focus sessions today: ${sessionCount}
            - Total focus time: ${totalFocusTime} minutes
            - Completed tasks: ${tasks.filter((t) => t.completed).length}
            - Pending tasks: ${tasks.filter((t) => !t.completed).length}
            - Task categories: ${[
              ...new Set(tasks.map((t) => t.category)),
            ].join(", ")}
            
            Provide practical, actionable advice for improving focus and productivity.`,
            },
          ],
          json_schema: {
            name: "focus_recommendations",
            schema: {
              type: "object",
              properties: {
                recommendations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" },
                      icon: { type: "string" },
                    },
                    required: ["title", "description", "icon"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["recommendations"],
              additionalProperties: false,
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI recommendations");
      }

      const data = await response.json();
      const result = JSON.parse(data.choices[0].message.content);
      setAiRecommendations(result.recommendations);
    } catch (error) {
      console.error("Error getting AI recommendations:", error);
      setAiRecommendations([
        {
          title: "Take Regular Breaks",
          description: "Follow the 25-5 rule for optimal focus",
          icon: "⏰",
        },
        {
          title: "Prioritize High-Impact Tasks",
          description: "Focus on your most important work first",
          icon: "🎯",
        },
        {
          title: "Minimize Distractions",
          description: "Turn off notifications during focus sessions",
          icon: "🔕",
        },
      ]);
    }
    setLoadingRecommendations(false);
  };

  React.useEffect(() => {
    if (activeTab === "dashboard") {
      getAIRecommendations();
    }
  }, [activeTab, sessionCount, tasks]);

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const onboardingScreens = [
    {
      title: "Welcome to FocusAI",
      description:
        "Your AI-powered productivity companion that helps you focus better and achieve more.",
      icon: "🧠",
    },
    {
      title: "Smart Time Management",
      description:
        "Use the Pomodoro technique with AI insights to optimize your work sessions.",
      icon: "⏱️",
    },
    {
      title: "Track Your Progress",
      description:
        "Get detailed analytics and personalized recommendations to boost your productivity.",
      icon: "📊",
    },
  ];

  if (currentScreen === "onboarding") {
    const screen = onboardingScreens[onboardingStep];
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "350px" }}>
          <div style={{ fontSize: "80px", marginBottom: "30px" }}>
            {screen.icon}
          </div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#ff6b35",
            }}
          >
            {screen.title}
          </h1>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.5",
              color: "#b0b0b0",
              marginBottom: "50px",
            }}
          >
            {screen.description}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "40px",
            }}
          >
            {onboardingScreens.map((_, index) => (
              <div
                key={index}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor:
                    index === onboardingStep ? "#ff6b35" : "#404040",
                }}
              />
            ))}
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            {onboardingStep > 0 && (
              <button
                onClick={() => setOnboardingStep(onboardingStep - 1)}
                style={{
                  flex: 1,
                  padding: "15px",
                  backgroundColor: "transparent",
                  border: "2px solid #404040",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (onboardingStep < onboardingScreens.length - 1) {
                  setOnboardingStep(onboardingStep + 1);
                } else {
                  setCurrentScreen("main");
                }
              }}
              style={{
                flex: 1,
                padding: "15px",
                backgroundColor: "#ff6b35",
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {onboardingStep < onboardingScreens.length - 1
                ? "Next"
                : "Get Started"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderDashboard = () => (
    <div style={{ padding: "20px" }}>
      {/* Dynamic Island Notification */}
      {dynamicIslandVisible && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#000",
            color: "white",
            padding: "12px 24px",
            borderRadius: "25px",
            fontSize: "14px",
            fontWeight: "500",
            zIndex: 1000,
            animation: "slideDown 0.3s ease-out",
            border: "1px solid #333",
          }}
        >
          {dynamicIslandText}
        </div>
      )}

      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "30px",
          color: "#ff6b35",
        }}
      >
        Dashboard
      </h1>

      {/* Today's Progress */}
      <div
        style={{
          backgroundColor: "#2d2d2d",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid #404040",
        }}
      >
        <h2
          style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px" }}
        >
          Today's Progress
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#ff6b35",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              {sessionCount}
            </div>
            <p style={{ color: "#b0b0b0", fontSize: "14px" }}>Focus Sessions</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#4CAF50",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              {Math.round(completionRate)}%
            </div>
            <p style={{ color: "#b0b0b0", fontSize: "14px" }}>Tasks Complete</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#2196F3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              {totalFocusTime}m
            </div>
            <p style={{ color: "#b0b0b0", fontSize: "14px" }}>Focus Time</p>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div
        style={{
          backgroundColor: "#2d2d2d",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid #404040",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          🤖 AI Recommendations
        </h2>
        {loadingRecommendations ? (
          <div
            style={{ textAlign: "center", padding: "20px", color: "#b0b0b0" }}
          >
            Loading personalized recommendations...
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {aiRecommendations.map((rec, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#1a1a1a",
                  borderRadius: "12px",
                  padding: "16px",
                  border: "1px solid #333",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>{rec.icon}</span>
                  <h3 style={{ fontSize: "16px", fontWeight: "600" }}>
                    {rec.title}
                  </h3>
                </div>
                <p
                  style={{
                    color: "#b0b0b0",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  {rec.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "16px",
        }}
      >
        <button
          onClick={() => setActiveTab("timer")}
          style={{
            backgroundColor: "#ff6b35",
            border: "none",
            borderRadius: "12px",
            padding: "20px",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="fas fa-play" style={{ fontSize: "24px" }}></i>
          Start Focus
        </button>
        <button
          onClick={() => setActiveTab("tasks")}
          style={{
            backgroundColor: "#2d2d2d",
            border: "1px solid #404040",
            borderRadius: "12px",
            padding: "20px",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="fas fa-tasks" style={{ fontSize: "24px" }}></i>
          View Tasks
        </button>
      </div>
    </div>
  );

  const renderTimer = () => {
    const progress =
      ((timerDurations[timerMode] - timeLeft) / timerDurations[timerMode]) *
      100;
    const circumference = 2 * Math.PI * 120;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "30px",
            color: "#ff6b35",
          }}
        >
          {timerMode === "focus"
            ? "Focus Time"
            : timerMode === "shortBreak"
            ? "Short Break"
            : "Long Break"}
        </h1>

        {/* Animated Progress Ring */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginBottom: "40px",
          }}
        >
          <svg width="280" height="280" style={{ transform: "rotate(-90deg)" }}>
            <circle
              cx="140"
              cy="140"
              r="120"
              stroke="#404040"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="140"
              cy="140"
              r="120"
              stroke="#ff6b35"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
              strokeLinecap="round"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "48px",
              fontWeight: "700",
              color: "white",
            }}
          >
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Timer Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <button
            onClick={isRunning ? pauseTimer : startTimer}
            style={{
              backgroundColor: "#ff6b35",
              border: "none",
              borderRadius: "50%",
              width: "80px",
              height: "80px",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className={`fas fa-${isRunning ? "pause" : "play"}`}></i>
          </button>
          <button
            onClick={resetTimer}
            style={{
              backgroundColor: "#2d2d2d",
              border: "1px solid #404040",
              borderRadius: "50%",
              width: "80px",
              height: "80px",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className="fas fa-redo"></i>
          </button>
        </div>

        {/* Mode Selector */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          {Object.keys(timerDurations).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setTimerMode(mode);
                setTimeLeft(timerDurations[mode]);
                setIsRunning(false);
              }}
              style={{
                backgroundColor: timerMode === mode ? "#ff6b35" : "#2d2d2d",
                border: timerMode === mode ? "none" : "1px solid #404040",
                borderRadius: "8px",
                padding: "12px 16px",
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              {mode === "focus"
                ? "Focus"
                : mode === "shortBreak"
                ? "Short Break"
                : "Long Break"}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderTasks = () => (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "30px",
          color: "#ff6b35",
        }}
      >
        Tasks
      </h1>

      {/* Add Task */}
      <div
        style={{
          backgroundColor: "#2d2d2d",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid #404040",
        }}
      >
        <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            style={{
              flex: 1,
              backgroundColor: "#1a1a1a",
              border: "1px solid #404040",
              borderRadius: "8px",
              padding: "12px",
              color: "white",
              fontSize: "16px",
            }}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #404040",
              borderRadius: "8px",
              padding: "12px",
              color: "white",
              fontSize: "16px",
            }}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Health">Health</option>
            <option value="Learning">Learning</option>
          </select>
          <button
            onClick={addTask}
            style={{
              backgroundColor: "#ff6b35",
              border: "none",
              borderRadius: "8px",
              padding: "12px 20px",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>
      </div>

      {/* Task List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              backgroundColor: "#2d2d2d",
              borderRadius: "12px",
              padding: "16px",
              border: "1px solid #404040",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <button
              onClick={() => toggleTask(task.id)}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                border: `2px solid ${task.completed ? "#4CAF50" : "#404040"}`,
                backgroundColor: task.completed ? "#4CAF50" : "transparent",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
              }}
            >
              {task.completed && <i className="fas fa-check"></i>}
            </button>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "#888" : "white",
                  marginBottom: "4px",
                }}
              >
                {task.text}
              </p>
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    backgroundColor: "#ff6b35",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "12px",
                  }}
                >
                  {task.category}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color:
                      task.priority === "high"
                        ? "#f44336"
                        : task.priority === "medium"
                        ? "#ff9800"
                        : "#4CAF50",
                  }}
                >
                  {task.priority} priority
                </span>
              </div>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#888",
                fontSize: "16px",
                cursor: "pointer",
                padding: "8px",
              }}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "30px",
          color: "#ff6b35",
        }}
      >
        Analytics
      </h1>

      {/* Weekly Chart */}
      <div
        style={{
          backgroundColor: "#2d2d2d",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid #404040",
        }}
      >
        <h2
          style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px" }}
        >
          Weekly Focus Time
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "end",
            gap: "12px",
            height: "200px",
          }}
        >
          {weeklyData.map((day, index) => {
            const maxMinutes = Math.max(...weeklyData.map((d) => d.minutes));
            const height = (day.minutes / maxMinutes) * 160;
            return (
              <div
                key={index}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: `${height}px`,
                    backgroundColor: "#ff6b35",
                    borderRadius: "4px 4px 0 0",
                    marginBottom: "8px",
                    transition: "height 0.3s ease",
                  }}
                ></div>
                <span style={{ fontSize: "12px", color: "#b0b0b0" }}>
                  {day.day}
                </span>
                <span style={{ fontSize: "10px", color: "#888" }}>
                  {day.minutes}m
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "16px",
        }}
      >
        <div
          style={{
            backgroundColor: "#2d2d2d",
            borderRadius: "12px",
            padding: "20px",
            textAlign: "center",
            border: "1px solid #404040",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#ff6b35",
              marginBottom: "8px",
            }}
          >
            {weeklyData.reduce((sum, day) => sum + day.minutes, 0)}
          </div>
          <p style={{ color: "#b0b0b0", fontSize: "14px" }}>Total Minutes</p>
        </div>
        <div
          style={{
            backgroundColor: "#2d2d2d",
            borderRadius: "12px",
            padding: "20px",
            textAlign: "center",
            border: "1px solid #404040",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#4CAF50",
              marginBottom: "8px",
            }}
          >
            {Math.round(
              weeklyData.reduce((sum, day) => sum + day.minutes, 0) / 7
            )}
          </div>
          <p style={{ color: "#b0b0b0", fontSize: "14px" }}>Daily Average</p>
        </div>
        <div
          style={{
            backgroundColor: "#2d2d2d",
            borderRadius: "12px",
            padding: "20px",
            textAlign: "center",
            border: "1px solid #404040",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#2196F3",
              marginBottom: "8px",
            }}
          >
            {Math.round(sessionCount * 1.2)}
          </div>
          <p style={{ color: "#b0b0b0", fontSize: "14px" }}>Weekly Sessions</p>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "30px",
          color: "#ff6b35",
        }}
      >
        Profile
      </h1>

      <div
        style={{
          backgroundColor: "#2d2d2d",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid #404040",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#ff6b35",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "32px",
          }}
        >
          👤
        </div>
        <h2
          style={{ fontSize: "24px", fontWeight: "600", marginBottom: "8px" }}
        >
          Focus Master
        </h2>
        <p style={{ color: "#b0b0b0", fontSize: "16px" }}>
          Productivity Enthusiast
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {[
          { icon: "fas fa-cog", label: "Settings", action: () => {} },
          { icon: "fas fa-bell", label: "Notifications", action: () => {} },
          { icon: "fas fa-calendar", label: "Calendar Sync", action: () => {} },
          { icon: "fas fa-download", label: "Export Data", action: () => {} },
          {
            icon: "fas fa-question-circle",
            label: "Help & Support",
            action: () => {},
          },
        ].map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            style={{
              backgroundColor: "#2d2d2d",
              border: "1px solid #404040",
              borderRadius: "12px",
              padding: "16px",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              textAlign: "left",
            }}
          >
            <i
              className={item.icon}
              style={{ fontSize: "20px", color: "#ff6b35" }}
            ></i>
            {item.label}
            <i
              className="fas fa-chevron-right"
              style={{ marginLeft: "auto", color: "#888" }}
            ></i>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1a1a",
        color: "white",
        fontFamily: "system-ui, -apple-system, sans-serif",
        paddingBottom: "80px",
      }}
    >
      {/* Main Content */}
      {activeTab === "dashboard" && renderDashboard()}
      {activeTab === "timer" && renderTimer()}
      {activeTab === "tasks" && renderTasks()}
      {activeTab === "analytics" && renderAnalytics()}
      {activeTab === "profile" && renderProfile()}

      {/* Bottom Navigation */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#2d2d2d",
          borderTop: "1px solid #404040",
          display: "flex",
          justifyContent: "space-around",
          padding: "12px 0",
          zIndex: 100,
        }}
      >
        {[
          { id: "dashboard", icon: "fas fa-chart-pie", label: "Dashboard" },
          { id: "timer", icon: "fas fa-clock", label: "Timer" },
          { id: "tasks", icon: "fas fa-tasks", label: "Tasks" },
          { id: "analytics", icon: "fas fa-chart-bar", label: "Analytics" },
          { id: "profile", icon: "fas fa-user", label: "Profile" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: activeTab === tab.id ? "#ff6b35" : "#888",
              fontSize: "12px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              padding: "8px 12px",
            }}
          >
            <i className={tab.icon} style={{ fontSize: "20px" }}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes slideDown {
          from {
            transform: translateX(-50%) translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
        
        input:focus, select:focus, button:focus {
          outline: 2px solid #ff6b35;
          outline-offset: 2px;
        }
        
        button:hover {
          transform: translateY(-1px);
          transition: transform 0.2s ease;
        }
        
        button:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

export default MainComponent;