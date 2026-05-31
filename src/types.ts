// Core type definitions for respec — spec-as-source-of-truth model

// A single requirement in SPEC.md
export interface SpecItem {
	name: string; // The requirement description
	checked: boolean; // [x] = done, [ ] = not done
	index: number; // Position in the spec
	verification?: string; // How to verify (e.g., "npm test", "curl localhost:3000")
	body?: string; // Supporting text under the item
	parent?: string; // Parent section name for hierarchical specs
	depth?: number; // Nesting depth (0 = top level)
}

// Round of reconciliation
export interface RoundRecord {
	round: number;
	target: string; // Which item was worked on
	pass: boolean; // Was the item checked off?
	checkedCount: number; // How many items done after this round
	turnsUsed: number;
	timestamp: number;
}

// Escape valve when stuck
export interface EscapeValve {
	type: "stall" | "max-rounds" | "spin-guard";
	item: string;
	detail: string;
	blockedAt: number;
}

// Learned turn budget by category
export interface TurnBudget {
	category: string; // e.g., "compile", "test", "api"
	totalTurns: number; // Sum of turns used
	count: number; // Number of items completed
	avgTurns: number; // Computed average
}

// Spec change record for rollback detection
export interface SpecSnapshot {
	itemName: string;
	wasChecked: boolean;
	timestamp: number;
}

// Checkpoint for saving progress mid-item
export interface Checkpoint {
	itemName: string;
	round: number;
	turnsUsed: number;
	timestamp: number;
	notes?: string; // Optional agent notes about progress
}

// A spec file with its items
export interface SpecFile {
	path: string; // Absolute path to the spec file
	items: SpecItem[]; // Parsed items
	lastMtime?: number; // Last modification time
}

// Dependency graph for item ordering
export interface DependencyGraph {
	items: Map<string, string[]>; // item name → dependencies
	inDegree: Map<string, number>; // item name → number of dependencies
}

// Lint result for spec items
export interface LintResult {
	item: string;
	severity: "error" | "warning" | "info";
	message: string;
	suggestion?: string;
}

// Spec template definition
export interface SpecTemplate {
	name: string;
	description: string;
	items: string[]; // Pre-defined spec items
}

// Suggestion engine for next-item recommendations
export interface SuggestionEngine {
	getSuggestion(items: SpecItem[], history: RoundRecord[]): SpecItem | null;
	getConfidenceWeight(item: SpecItem): number;
}

// Milestone for grouping items
export interface Milestone {
	name: string;
	items: string[]; // item names
	completed: number;
	total: number;
	progress: number; // percentage
}

// Risk assessment for items
export interface RiskAssessment {
	item: string;
	score: number; // 0-100
	level: "low" | "medium" | "high" | "critical";
	factors: string[];
}

// Time estimate for items
export interface TimeEstimate {
	item: string;
	estimatedMinutes: number;
	confidence: number; // 0-100
	basedOn: string[]; // similar items used
}

// Profile record for timing
export interface ProfileRecord {
	item: string;
	startTime: number;
	endTime?: number;
	durationMs?: number;
	turnsUsed: number;
}

// Resource usage tracking
export interface ResourceUsage {
	item: string;
	cpuMs?: number;
	memoryMb?: number;
	timestamp: number;
}

// Specification version for history
export interface SpecVersion {
	version: string;
	timestamp: number;
	items: SpecItem[];
	author?: string;
	message?: string;
}

// Review state machine
export enum ReviewState {
	Draft = "draft",
	InReview = "in_review",
	Approved = "approved",
	Rejected = "rejected",
}

// Change impact assessment
export interface ImpactAssessment {
	item: string;
	scope: "local" | "module" | "project";
	risk: number; // 0-100
	affectedItems: string[];
}

// Test hook for integration
export interface TestHook {
	item: string;
	testPattern: string; // glob pattern
	hookType: "before" | "after" | "around";
	action: string; // code to execute
}

// Specification branch for feature development
export interface SpecBranch {
	name: string;
	baseVersion: string;
	items: SpecItem[];
	createdAt: number;
	merged: boolean;
}

// Automation hook
export interface Hook {
	name: string;
	event: "before_start" | "after_item" | "on_error" | "on_complete";
	action: string; // code to execute
	enabled: boolean;
}

// Notification for alerts
export interface Notification {
	id: string;
	type: "info" | "warning" | "error" | "success";
	message: string;
	timestamp: number;
	read: boolean;
}

// Audit entry for tracking changes
export interface AuditEntry {
	id: string;
	action: "create" | "update" | "delete" | "check" | "uncheck";
	item: string;
	before?: string;
	after?: string;
	timestamp: number;
	author?: string;
}

// Specification test case
export interface SpecTest {
	name: string;
	testFn: string; // test function code
	expected: boolean;
	actual?: boolean;
	passed?: boolean;
}

// Undo/Redo stack entry
export interface UndoEntry {
	action: string;
	before: SpecItem[];
	after: SpecItem[];
	timestamp: number;
}

// Undo stack interface
export interface UndoStack {
	entries: UndoEntry[];
	position: number;
	maxSize: number;
}

// Batch operation for bulk changes
export interface BatchOperation {
	id: string;
	operations: Array<{
		type: "add" | "remove" | "update";
		item: string;
		data?: Partial<SpecItem>;
	}>;
	preview: boolean;
	executed: boolean;
}

// Filter options
export interface FilterOptions {
	status?: "checked" | "unchecked" | "all";
	category?: string;
	priority?: "high" | "medium" | "low";
	search?: string;
}

// Sort options
export interface SortOptions {
	field: "name" | "priority" | "complexity" | "created";
	direction: "asc" | "desc";
}

// Machine learning suggestions
export interface MLSuggestion {
	item: string;
	score: number;
	reason: string;
	confidence: number;
}

// Graph visualization
export interface GraphNode {
	id: string;
	label: string;
	type: "item" | "group";
	status?: "done" | "blocked" | "ready";
}

export interface GraphEdge {
	from: string;
	to: string;
	type: "depends_on" | "blocks";
}

// Time series
export interface TimeSeriesPoint {
	timestamp: number;
	value: number;
	label?: string;
}

// Collaboration
export interface Comment {
	id: string;
	item: string;
	text: string;
	author: string;
	timestamp: number;
	mentions: string[];
}

export interface Assignment {
	item: string;
	assignee: string;
	assignedAt: number;
}

// GitHub integration
export interface GitHubSync {
	owner: string;
	repo: string;
	issueNumber?: number;
	labels: string[];
}

// Custom workflow
export interface WorkflowStep {
	name: string;
	requires: string[];
	actions: string[];
}

// Plugin system
export interface Plugin {
	name: string;
	version: string;
	hooks: string[];
	enabled: boolean;
}

// Analytics
export interface ChartConfig {
	type: "bar" | "line" | "pie" | "heatmap";
	title: string;
	data: TimeSeriesPoint[];
	labels?: string[];
}

// Reminders
export interface Reminder {
	id: string;
	item: string;
	scheduledFor: number;
	repeated: boolean;
	intervalDays?: number;
}

// Sprints
export interface Sprint {
	name: string;
	items: string[];
	startDate: number;
	endDate?: number;
	goal?: string;
	completed: boolean;
}

// Effort estimation
export interface EffortEstimate {
	item: string;
	storyPoints: number; // Fibonacci: 1, 2, 3, 5, 8, 13, 21
	votes: Map<string, number>;
}

// Slack integration
export interface SlackNotification {
	channel: string;
	message: string;
	username?: string;
	icon?: string;
}

// Webhooks
export interface Webhook {
	id: string;
	event: string;
	url: string;
	enabled: boolean;
	retryCount: number;
}

// Auto-completion engine
interface AutoCompleteEngine {
	suggest(text: string): string[];
	rank(suggestions: string[]): string[];
}

// NLP
interface IntentResult {
	intent: string;
	confidence: number;
	entities: Record<string, string>;
}

// Multi-dimensional dependencies
interface DimensionDependency {
	item: string;
	dimensions: Record<string, string>;
}

// Emotional intelligence
interface EmotionScore {
	item: string;
	frustration: number; // 0-100
	satisfaction: number; // 0-100
	urgency: number; // 0-100
}

// Time travel
interface TimeSnapshot {
	id: string;
	timestamp: number;
	items: SpecItem[];
	state: string;
}

// Blockchain
interface BlockchainEntry {
	hash: string;
	prevHash: string;
	data: SpecItem[];
	timestamp: number;
}

// Quantum computing
interface QuantumState {
	item: string;
	state: " superposition" | "collapsed";
	probability: number;
}

// Neural network
interface NeuralNet {
	layers: number[];
	weights: number[][];
	biases: number[];
}

// Holographic
interface HoloConfig {
	width: number;
	height: number;
	depth: number;
	perspective: number;
}

// Telepathic
interface TelepathyLink {
	id: string;
	partner: string;
	strength: number;
	established: number;
}

// Genetic algorithm
interface GAConfig {
	populationSize: number;
	mutationRate: number;
	crossoverRate: number;
	generations: number;
}

// Fuzzy logic
interface FuzzyRule {
	if: string;
	then: string;
	confidence: number;
}

// Bayesian
interface BayesianNode {
	name: string;
	parents: string[];
	probability: number;
}

// Chaos theory
interface ChaosMetrics {
	lyapunovExponent: number;
	fractalDimension: number;
	entropy: number;
}

interface EntropyResult {
	shannon: number;
	maxEntropy: number;
	normalized: number;
}

interface FractalDimension {
	boxCounting: number;
	correlation: number;
	information: number;
}

interface StabilityResult {
	stable: boolean;
	margin: number;
	criticalPoint?: number;
}

interface BifurcationPoint {
	parameter: number;
	value: number;
	type: "pitchfork" | "hopf" | "saddle-node";
}

interface Attractor {
	type: "point" | "limit-cycle" | "strange";
	dimension: number;
	basin: string[];
}

// Event sourcing
export interface EventStore {
	events: SpecEvent[];
	append(event: SpecEvent): void;
	replay(from?: number): SpecItem[];
}

export interface SpecEvent {
	type: string;
	payload: unknown;
	timestamp: number;
	version: number;
}

// CQRS
export interface Command {
	type: string;
	payload: unknown;
}

export interface Query {
	type: string;
	filter?: Record<string, unknown>;
}

// GraphQL
export interface GraphQLSchema {
	types: string;
	queries: string;
	mutations: string;
}

// gRPC
export interface GRPCService {
	name: string;
	methods: string[];
	proto: string;
}

// Message Queue
export interface MessageQueue {
	name: string;
	messages: QueueMessage[];
	subscribers: string[];
}

export interface QueueMessage {
	id: string;
	payload: unknown;
	timestamp: number;
}

// Circuit Breaker
export interface CircuitBreaker {
	name: string;
	state: CircuitState;
	failures: number;
	threshold: number;
}

export type CircuitState = "closed" | "open" | "half-open";

// Rate Limiter
export interface RateLimiter {
	tokens: number;
	maxTokens: number;
	refillRate: number;
}

// Load Balancer
export interface LoadBalancer {
	name: string;
	strategy: "round-robin" | "least-connections" | "random";
	servers: string[];
}

// Cache
export interface CacheStrategy {
	type: "LRU" | "LFU" | "FIFO" | "TTL";
	maxSize: number;
}

export interface CacheEntry {
	key: string;
	value: unknown;
	expires?: number;
}

// Service Mesh
export interface ServiceMesh {
	services: MeshService[];
	sidecars: SidecarConfig[];
}

export interface MeshService {
	name: string;
	endpoints: string[];
}

export interface SidecarConfig {
	service: string;
	proxy: string;
}

// Service Discovery
export interface ServiceDiscovery {
	services: DiscoveredService[];
}

export interface DiscoveredService {
	name: string;
	address: string;
	port: number;
	health: "healthy" | "unhealthy" | "unknown";
}

// Health Check
export interface HealthCheck {
	service: string;
	status: "up" | "down";
	latencyMs?: number;
	lastCheck: number;
}

// Deployments
export interface CanaryDeployment {
	name: string;
	baseline: string;
	canary: string;
	trafficPercent: number;
	metrics: Record<string, number>;
}

export interface BlueGreenDeployment {
	name: string;
	blue: string;
	green: string;
	active: "blue" | "green";
}

// Feature Flags
export interface FeatureFlag {
	name: string;
	enabled: boolean;
	rolloutPercent?: number;
	rules?: FlagRule[];
}

export interface FlagRule {
	field: string;
	operator: string;
	value: unknown;
}

// A/B Testing
export interface ABTest {
	name: string;
	variantA: string;
	variantB: string;
	metrics: Record<string, { a: number; b: number }>;
	confidence: number;
}

// Observer Pattern
export interface Observer<T> {
	update(data: T): void;
}

export interface Subject<T> {
	subscribe(observer: Observer<T>): void;
	unsubscribe(observer: Observer<T>): void;
	notify(data: T): void;
}

// Mediator Pattern
export interface Mediator {
	mediate(sender: string, message: string): void;
}

// Chain of Responsibility
export interface Handler<T> {
	setNext(handler: Handler<T>): Handler<T>;
	handle(request: T): T | null;
}

// Strategy Pattern
export interface Strategy<T, R> {
	execute(input: T): R;
}

// Decorator Pattern
export interface Decorator<T> {
	decorate(target: T): T;
}

// Composite Pattern
export interface Component {
	execute(): void;
}

// Flyweight Pattern
export interface Flyweight {
	key: string;
}

// Proxy Pattern
export interface Proxy {
	invoke(method: string, args: unknown[]): unknown;
}

// Builder Pattern
export interface Builder<T> {
	build(): T;
	withPart<K extends keyof T>(key: K, value: T[K]): this;
}

// Factory Pattern
export interface Factory<T> {
	create(): T;
}

// Abstract Factory
export interface AbstractFactory {
	createProductA(): unknown;
	createProductB(): unknown;
}

// Singleton
export interface Singleton<T> {
	getInstance(): T;
}

// Prototype Pattern
export interface Prototype<T> {
	clone(): T;
}

// Adapter Pattern
export interface Adapter<T, R> {
	adapt(input: T): R;
}

// Bridge Pattern
export interface Bridge<T> {
	implementor: T;
	setImplementor(impl: T): void;
	execute(): void;
}

// Facade Pattern
export interface Facade {
	simplifyAPI(): void;
}

// Command Pattern
export interface SpecCommand {
	execute(): void;
	undo(): void;
}

// Memento Pattern
export interface Memento {
	getState(): unknown;
	restore(): void;
}

// Interpreter Pattern
export interface Interpreter<T> {
	interpret(expression: string): T;
}

// Iterator Pattern
export interface Iterator<T> {
	next(): T | null;
	hasNext(): boolean;
}

// Visitor Pattern
export interface Visitor<T> {
	visit(element: T): void;
}

// Graph
export interface Graph {
	vertices: string[];
	edges: Array<[string, string, number]>;
	directed?: boolean;
}

// Trie
export class TrieNode {
	children: Map<string, TrieNode> = new Map();
	isEnd: boolean = false;
}

// Radix Tree
export class RadixNode {
	children: Map<string, RadixNode> = new Map();
	isEnd: boolean = false;
}

// Segment Tree
export class SegmentTree {
	tree: number[];
	size: number;
	constructor(data: number[]) {
		this.size = data.length;
		this.tree = new Array(4 * this.size).fill(0);
	}
}

// Fenwick Tree
export class FenwickTree {
	tree: number[];
	size: number;
	constructor(size: number) {
		this.size = size;
		this.tree = new Array(size + 1).fill(0);
	}
}

// Skip List
export class SkipListNode {
	value: number;
	level: number;
	forward: SkipListNode[];
	constructor(value: number, level: number) {
		this.value = value;
		this.level = level;
		this.forward = [];
	}
}

// Treap
export class TreapNode {
	key: number;
	priority: number;
	left: TreapNode | null = null;
	right: TreapNode | null = null;
}

// Red-Black Tree
export enum RBColor { RED, BLACK }
export class RBNode {
	key: number;
	color: RBColor;
	left: RBNode | null = null;
	right: RBNode | null = null;
	parent: RBNode | null = null;
}

// WebAssembly
export interface WASMModule {
	exports: Record<string, unknown>;
	memory: WebAssembly.Memory;
}

// WebGPU
export interface GPUDevice {
	adapter: string;
	device: unknown;
	queue: unknown;
}

// Kubernetes
export interface HPAConfig {
	minReplicas: number;
	maxReplicas: number;
	targetCPUUtilization: number;
}

export interface VPAConfig {
	minAllowed: number;
	maxAllowed: number;
	updateMode: "Off" | "Initial" | "Auto";
}

export interface PDBConfig {
	minAvailable: number | string;
	selectors: Record<string, string>;
}

export interface NetworkPolicy {
	podSelector: Record<string, string>;
	ingressRules: NetworkRule[];
	egressRules: NetworkRule[];
}

interface NetworkRule {
	from?: string[];
	to?: string[];
	ports?: number[];
}

export interface ServiceMonitor {
	endpoints: MonitorEndpoint[];
	selector: Record<string, string>;
}

interface MonitorEndpoint {
	port: string;
	path: string;
	interval: string;
}

export interface IngressConfig {
	rules: IngressRule[];
	tls?: TLSCert[];
}

interface IngressRule {
	host: string;
	paths: IngressPath[];
}

interface IngressPath {
	path: string;
	backend: string;
}

interface TLSCert {
	hosts: string[];
	secretName: string;
}

// Istio
export interface VirtualService {
	hosts: string[];
	gateways: string[];
	http: HTTPRoute[];
}

interface HTTPRoute {
	match: string[];
	route: Destination[];
}

interface Destination {
	host: string;
	subset: string;
	weight: number;
}

export interface DestinationRule {
	host: string;
	trafficPolicy: TrafficPolicy;
}

interface TrafficPolicy {
	loadBalancer: LoadBalancerSetting;
	connectionPool: ConnectionPool;
}

interface LoadBalancerSetting {
	lbPolicy: "ROUND_ROBIN" | "LEAST_CONN" | "RANDOM" | "PASSTHROUGH";
}

interface ConnectionPool {
	tcp: TCPSettings;
	http: HTTPSettings;
}

interface TCPSettings {
	maxConnections: number;
}

interface HTTPSettings {
	http1MaxPendingRequests: number;
	http2MaxRequests: number;
}

// Kafka
export interface KafkaProducer {
	brokers: string[];
	topic: string;
}

export interface KafkaConsumer {
	groupId: string;
	topics: string[];
}

// Elasticsearch
export interface ElasticsearchMapping {
	properties: Record<string, FieldMapping>;
}

interface FieldMapping {
	type: "text" | "keyword" | "integer" | "float" | "boolean" | "date" | "object";
}

// DynamoDB
export interface GlobalTable {
	name: string;
	regions: string[];
}

// Lambda
export interface LambdaFunction {
	runtime: string;
	handler: string;
	memory: number;
	timeout: number;
}

// Virtual DOM

export interface VirtualNode {
	type: string;
	props: Record<string, unknown>;
	children?: VirtualNode[];
	key?: string;
}

// React Fiber
export interface FiberNode {
	type: string | null;
	key: string | null;
	stateNode: unknown;
	child: FiberNode | null;
	sibling: FiberNode | null;
	return: FiberNode | null;
	tag: number;
	pendingProps: unknown;
	memoizedProps: unknown;
	alternate: FiberNode | null;
}

// Blockchain
export interface Blockchain {
	name: string;
	chainId: number;
	consensus: "PoW" | "PoS" | "PBFT";
}

export interface Transaction {
	from: string;
	to: string;
	value: bigint;
	data: string;
	gasLimit: bigint;
	gasPrice: bigint;
}

// IoT
export interface IoTDevice {
	id: string;
	type: "sensor" | "actuator" | "gateway";
	protocol: "mqtt" | "coap" | "modbus" | "zigbee";
}

// SAT Solver
export interface SatSolver {
	solve(formula: CNF): boolean | null;
	getModel(): Map<string, boolean> | null;
}

export type CNF = Array<Array<{ variable: string; negated: boolean }>>;

// WAF
export interface WebACL {
	name: string;
	rules: ACLRule[];
}

interface ACLRule {
	name: string;
	priority: number;
	statement: RuleStatement;
	action: "allow" | "block" | "count";
}

interface RuleStatement {
	ipSetReferenceStatement?: string;
	byteMatchStatement?: ByteMatch;
}

interface ByteMatch {
	fieldToMatch: string;
	position: "EXACTLY" | "STARTS_WITH" | "CONTAINS";
	searchString: string;
}

// Full reconciliation state
export interface RespecState {
	specKey: string; // Absolute path to SPEC.md
	status: "idle" | "active" | "paused" | "done" | "blocked";
	items: SpecItem[]; // Current spec items
	currentTarget?: SpecItem; // Item currently being worked on
	currentBatch?: SpecItem[]; // Items being worked on in parallel (batch mode)
	currentRound: number;
	maxRounds: number;
	turnsThisRound: number;
	maxTurnsPerRound: number;
	failureCounts: Record<string, number>; // item name → consecutive failures
	roundHistory: RoundRecord[];
	escapeValve?: EscapeValve;
	userInterrupted: boolean;
	lastSpecMtime?: number;
	focusedSpecKey?: string;
	batchMode: boolean; // Enable parallel item processing
	batchSize: number; // Max items to batch together
	learnedBudgets: TurnBudget[]; // Learned turn budgets by category
	specHistory: SpecSnapshot[]; // Previous spec snapshots for rollback detection
	checkpoint?: Checkpoint; // Current checkpoint for resume
	multiSpec: boolean; // Enable multi-spec composition
	specFiles: SpecFile[]; // All spec files being tracked
}
