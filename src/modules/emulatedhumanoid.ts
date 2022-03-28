const workspace = game.GetService("Workspace");

const createPart = () => {
	const instance = new Instance("SpawnLocation");
	instance.Enabled = false;
	instance.Size = new Vector3(1, 2, 1);
	instance.BrickColor = new BrickColor(36);
	instance.Massless = true;
	return instance;
};

const createMotor = () => {
	const motor = new Instance("Motor6D");
	return motor;
};

class emulatedHumanoid {
	private model = new Instance("Model");
	private humanoid = new Instance("Humanoid");
	private torso = createPart();
	private rightArm = createPart();
	private rightShoulder = createMotor();
	private equippedTool: Tool | undefined = undefined;
	constructor() {
		const rightArm = this.rightArm;
		const rightShoulder = this.rightShoulder;
		const torso = this.torso;
		const humanoid = this.humanoid;
		const model = this.model;
		// Config things 😢
		rightArm.Name = "Right Arm";
		rightShoulder.Name = "Right Shoulder";
		rightShoulder.C0 = new CFrame(1, 0.5, 0);
		rightShoulder.C1 = new CFrame(); // to-do: set c1

		torso.Size = new Vector3(2, 2, 2);
		torso.Anchored = true;
		torso.Name = "Torso";

		humanoid.BreakJointsOnDeath = false;
		humanoid.MaxHealth = 0 / 0;
		humanoid.Health = math.huge;
		humanoid.RequiresNeck = false;
		humanoid.RigType = Enum.HumanoidRigType.R6;
		torso.Parent = model;
		rightShoulder.Parent = torso;
		humanoid.Parent = model;
		model.Parent = script;
	}
	private weldTool(tool: Tool, part1: Part) {
		const handle = tool.FindFirstChild("Handle");
		if (!handle || !handle.IsA("BasePart")) return;
		// Lets reweld the tool 🥶
		part1.FindFirstChildWhichIsA("Weld", true)?.Destroy(); // to-do: Actually find the weld name and destroy it (this is a messy fix)
		const weld = new Instance("Weld");
		weld.C0 = new CFrame(0, 0, 0).add(new Vector3(0, part1.Size.Y / 2, 0));
		weld.Part0 = handle;
		weld.Part1 = part1;
		weld.Name = "weldTool -> weld";
		weld.Parent = tool;
	}
	public unequipTool() {
		if (this.equippedTool) this.equippedTool.Parent = workspace; // Roblox will parent the tool to the players backpack, so we cant use Players::GetPlayerFromCharacter
	}
	public equipTool(tool: Tool) {
		this.unequipTool(); // If a tool is equipped, lets de-equip it
		this.humanoid.EquipTool(tool); // roblox won't check if the humanoid is a player because you don't need a backpack for holding tools
		this.equippedTool = tool;
	}
}

export default emulatedHumanoid;
