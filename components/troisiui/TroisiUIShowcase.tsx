"use client";

import {
	Accordion,
	Alert,
	Avatar,
	Badge,
	Box,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Card,
	Carousel,
	Checkbox,
	Chip,
	Code,
	CodeBlock,
	ColorInput,
	CommandPalette,
	Container,
	DateInput,
	Divider,
	Drawer,
	EmptyState,
	FieldError,
	FieldHelper,
	FileInput,
	Form,
	FormField,
	Grid,
	Image,
	Input,
	Label,
	Lightbox,
	Link,
	List,
	ListItem,
	Menu,
	MenuItem,
	Modal,
	Pagination,
	Popover,
	Progress,
	Radio,
	SearchInput,
	Select,
	Sidebar,
	SidebarItem,
	Skeleton,
	Slider,
	Spacer,
	Spinner,
	Stack,
	Stat,
	Stepper,
	Switch,
	Table,
	TableSortHeader,
	Tabs,
	TabsList,
	TabsPanel,
	TabsTrigger,
	Tag,
	Textarea,
	Timeline,
	TimelineItem,
	Tooltip,
	Typography,
	useToast,
	Video,
} from "@troisi/ui";
import { useState } from "react";
import { external } from "@/lib/external";
import { troisiUiRepo } from "@/lib/projects";

function ShowcaseSection({
	id,
	title,
	children,
}: {
	id: string;
	title: string;
	children: React.ReactNode;
}) {
	const headingId = `${id}-heading`;

	return (
		<section
			id={id}
			className="troisi-showcase-section"
			aria-labelledby={headingId}
		>
			<Container>
				<Stack gap={6}>
					<Typography variant="h2" id={headingId}>
						{title}
					</Typography>
					<Stack gap={4}>{children}</Stack>
				</Stack>
			</Container>
		</section>
	);
}

function ShowcasePanel({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={["troisi-showcase-panel", className].filter(Boolean).join(" ")}
		>
			{children}
		</div>
	);
}

function Overlays() {
	const { toast } = useToast();
	const [modal, setModal] = useState(false);
	const [drawer, setDrawer] = useState(false);
	const [cmd, setCmd] = useState(false);
	const [lightbox, setLightbox] = useState(false);

	return (
		<Stack gap={4}>
			<div className="troisi-showcase-row">
				<Button onClick={() => setModal(true)}>Modal</Button>
				<Button variant="secondary" onClick={() => setDrawer(true)}>
					Drawer
				</Button>
				<Button variant="secondary" onClick={() => setCmd(true)}>
					Command palette
				</Button>
				<Button variant="ghost" onClick={() => toast("Saved successfully")}>
					Toast
				</Button>
				<Button variant="ghost" onClick={() => setLightbox(true)}>
					Lightbox
				</Button>
			</div>
			<Modal
				open={modal}
				onClose={() => setModal(false)}
				title="Example modal"
				footer={<Button onClick={() => setModal(false)}>Close</Button>}
			>
				<Typography variant="body">
					Modal body with focus trap and backdrop dismiss.
				</Typography>
			</Modal>
			<Drawer open={drawer} onClose={() => setDrawer(false)} title="Drawer">
				<Typography variant="body">Slides in from the right.</Typography>
			</Drawer>
			<CommandPalette
				open={cmd}
				onClose={() => setCmd(false)}
				items={[
					{ id: "1", label: "Go to Typography", onSelect: () => setCmd(false) },
					{ id: "2", label: "Toggle theme", onSelect: () => setCmd(false) },
				]}
			/>
			<Lightbox
				open={lightbox}
				onClose={() => setLightbox(false)}
				src="https://picsum.photos/800/500"
				alt="Sample"
			/>
		</Stack>
	);
}

const SIDEBAR_PAGES = [
	["dashboard", "Dashboard"],
	["settings", "Settings"],
	["profile", "Profile"],
] as const;

type SidebarPage = (typeof SIDEBAR_PAGES)[number][0];

function TabsDemo() {
	const [tab, setTab] = useState("overview");

	return (
		<Tabs value={tab} onValueChange={setTab}>
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="details">Details</TabsTrigger>
				<TabsTrigger value="settings">Settings</TabsTrigger>
			</TabsList>
			<TabsPanel value="overview">
				<Typography variant="body" tone="muted">
					Overview tab — click tabs or use arrow keys to switch.
				</Typography>
			</TabsPanel>
			<TabsPanel value="details">
				<Typography variant="body" tone="muted">
					Details tab content.
				</Typography>
			</TabsPanel>
			<TabsPanel value="settings">
				<Typography variant="body" tone="muted">
					Settings tab content.
				</Typography>
			</TabsPanel>
		</Tabs>
	);
}

function SidebarDemo() {
	const [page, setPage] = useState<SidebarPage>("dashboard");

	return (
		<div className="troisi-showcase-sidebar-demo">
			<Sidebar aria-label="Example sidebar">
				{SIDEBAR_PAGES.map(([id, label]) => (
					<SidebarItem
						key={id}
						active={page === id}
						onClick={() => setPage(id)}
					>
						{label}
					</SidebarItem>
				))}
			</Sidebar>
		</div>
	);
}

export function TroisiUIShowcase() {
	const [page, setPage] = useState(1);
	const [sort, setSort] = useState<"asc" | "desc" | null>(null);
	const [checked, setChecked] = useState(true);
	const [switched, setSwitched] = useState(true);
	const [slider, setSlider] = useState(40);

	return (
		<>
			<ShowcaseSection id="typography" title="Typography">
				<ShowcasePanel>
					<Stack gap={3}>
						<Typography variant="display">Display</Typography>
						<Typography variant="h1">Heading 1</Typography>
						<Typography variant="h2">Heading 2</Typography>
						<Typography variant="h3">Heading 3</Typography>
						<Typography variant="body">
							Body text for paragraphs and UI copy.
						</Typography>
						<Typography variant="small" tone="muted">
							Small muted caption
						</Typography>
						<Typography variant="code">
							const troisi = &quot;ui&quot;;
						</Typography>
					</Stack>
				</ShowcasePanel>
			</ShowcaseSection>

			<ShowcaseSection id="layout" title="Layout">
				<ShowcasePanel>
					<Grid cols={3} gap={4} className="troisi-showcase-grid">
						<Box className="troisi-showcase-cell">Box / grid cell</Box>
						<Box className="troisi-showcase-cell">Box / grid cell</Box>
						<Box className="troisi-showcase-cell">Box / grid cell</Box>
					</Grid>
				</ShowcasePanel>
				<ShowcasePanel>
					<Stack gap={3}>
						<Typography variant="body">
							Stack with divider and spacer
						</Typography>
						<Divider />
						<Typography variant="small" tone="muted">
							Above
						</Typography>
						<Spacer size={4} />
						<Typography variant="small" tone="muted">
							Below
						</Typography>
					</Stack>
				</ShowcasePanel>
			</ShowcaseSection>

			<ShowcaseSection id="forms" title="Forms">
				<ShowcasePanel>
					<div className="troisi-showcase-row">
						<Button>Primary</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="icon" size="sm" aria-label="Icon">
							★
						</Button>
					</div>
				</ShowcasePanel>
				<ShowcasePanel className="troisi-showcase-form">
					<Form onSubmit={(e) => e.preventDefault()}>
						<Stack gap={4}>
							<FormField>
								<Label htmlFor="demo-input">Name</Label>
								<Input id="demo-input" placeholder="Jane Doe" />
								<FieldHelper>Your display name</FieldHelper>
							</FormField>
							<FormField>
								<Label htmlFor="demo-textarea">Bio</Label>
								<Textarea
									id="demo-textarea"
									rows={3}
									placeholder="Short bio…"
								/>
							</FormField>
							<FormField>
								<Label htmlFor="demo-select">Role</Label>
								<Select id="demo-select" defaultValue="eng">
									<option value="eng">Engineer</option>
									<option value="design">Designer</option>
								</Select>
							</FormField>
							<FormField>
								<Label htmlFor="demo-search">Search</Label>
								<SearchInput id="demo-search" placeholder="Search…" />
							</FormField>
							<div className="troisi-showcase-form__controls">
								<Checkbox
									id="demo-checkbox"
									checked={checked}
									onChange={(e) => setChecked(e.target.checked)}
									label="Checkbox"
								/>
								<Radio
									id="demo-radio-a"
									name="demo-radio"
									value="a"
									defaultChecked
									label="Radio A"
								/>
								<Radio
									id="demo-radio-b"
									name="demo-radio"
									value="b"
									label="Radio B"
								/>
								<Switch
									id="demo-switch"
									checked={switched}
									onChange={(e) => setSwitched(e.target.checked)}
									label="Switch"
								/>
							</div>
							<FormField>
								<Label htmlFor="demo-slider">Slider ({slider})</Label>
								<Slider
									id="demo-slider"
									min={0}
									max={100}
									value={slider}
									onChange={(e) => setSlider(Number(e.target.value))}
								/>
							</FormField>
							<div className="troisi-showcase-form__inline">
								<DateInput id="demo-date" aria-label="Date" />
								<ColorInput
									id="demo-color"
									aria-label="Color"
									defaultValue="#3b82f6"
								/>
							</div>
							<FormField>
								<Label htmlFor="demo-file">Attachment</Label>
								<FileInput id="demo-file" buttonLabel="Upload file" />
							</FormField>
							<FieldError>This field is required</FieldError>
						</Stack>
					</Form>
				</ShowcasePanel>
			</ShowcaseSection>

			<ShowcaseSection id="navigation" title="Navigation">
				<ShowcasePanel>
					<Breadcrumb>
						<BreadcrumbItem>
							<Link href="#">Home</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<Link href="#">Docs</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>Components</BreadcrumbItem>
					</Breadcrumb>
				</ShowcasePanel>
				<ShowcasePanel>
					<TabsDemo />
				</ShowcasePanel>
				<ShowcasePanel>
					<Stepper
						steps={[
							{ label: "Account", status: "done" },
							{ label: "Profile", status: "active" },
							{ label: "Done", status: "upcoming" },
						]}
					/>
				</ShowcasePanel>
				<ShowcasePanel>
					<Pagination page={page} totalPages={5} onPageChange={setPage} />
				</ShowcasePanel>
				<ShowcasePanel>
					<div className="troisi-showcase-row">
						<Menu trigger={<Button variant="secondary">Menu</Button>}>
							<MenuItem>Item one</MenuItem>
							<MenuItem>Item two</MenuItem>
						</Menu>
						<Popover trigger={<Button variant="ghost">Popover</Button>}>
							<Typography variant="small">Popover content</Typography>
						</Popover>
						<Tooltip tooltip="Tooltip on hover">
							<Button variant="ghost">Tooltip</Button>
						</Tooltip>
						<Link href={troisiUiRepo} variant="subtle" {...external}>
							Link
						</Link>
					</div>
				</ShowcasePanel>
				<ShowcasePanel>
					<SidebarDemo />
				</ShowcasePanel>
			</ShowcaseSection>

			<ShowcaseSection id="feedback" title="Feedback">
				<ShowcasePanel>
					<Stack gap={3}>
						<Alert variant="info" heading="Info">
							Neutral informational alert.
						</Alert>
						<Alert variant="success" heading="Success">
							Operation completed.
						</Alert>
						<Alert variant="warning" heading="Warning">
							Check your input.
						</Alert>
						<Alert variant="danger" heading="Error">
							Something went wrong.
						</Alert>
					</Stack>
				</ShowcasePanel>
				<ShowcasePanel>
					<div className="troisi-showcase-row">
						<Spinner />
						<Progress className="troisi-showcase-progress" value={65} />
					</div>
				</ShowcasePanel>
				<ShowcasePanel>
					<Stack gap={3}>
						<Skeleton variant="text" />
						<Skeleton variant="block" style={{ height: "4rem" }} />
					</Stack>
				</ShowcasePanel>
				<ShowcasePanel>
					<Overlays />
				</ShowcasePanel>
			</ShowcaseSection>

			<ShowcaseSection id="data" title="Data display">
				<ShowcasePanel>
					<div className="troisi-showcase-row">
						<Badge>Default</Badge>
						<Badge variant="success">Success</Badge>
						<Tag>Tag</Tag>
						<Chip>Chip</Chip>
						<Avatar initials="IT" />
					</div>
				</ShowcasePanel>
				<ShowcasePanel>
					<Card title="Card title" description="Supporting description">
						<Typography variant="body" tone="muted">
							Card body slot for any content.
						</Typography>
					</Card>
				</ShowcasePanel>
				<ShowcasePanel>
					<Stat label="Users" value="12.4k" />
				</ShowcasePanel>
				<ShowcasePanel>
					<List>
						<ListItem>List item one</ListItem>
						<ListItem>List item two</ListItem>
					</List>
				</ShowcasePanel>
				<ShowcasePanel>
					<Table>
						<thead>
							<tr>
								<TableSortHeader
									sortDirection={sort}
									onSort={() => setSort(sort === "asc" ? "desc" : "asc")}
								>
									Name
								</TableSortHeader>
								<th>Role</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Ian</td>
								<td>Engineer</td>
							</tr>
							<tr>
								<td>Demo</td>
								<td>Design</td>
							</tr>
						</tbody>
					</Table>
				</ShowcasePanel>
				<ShowcasePanel>
					<Accordion
						items={[
							{ id: "1", title: "Section one", content: "Accordion content A" },
							{ id: "2", title: "Section two", content: "Accordion content B" },
						]}
					/>
				</ShowcasePanel>
				<ShowcasePanel className="troisi-showcase-carousel-wrap">
					<Carousel
						slides={[
							{
								id: "1",
								content: (
									<Box className="troisi-showcase-cell troisi-showcase-cell--slide">
										Slide 1
									</Box>
								),
							},
							{
								id: "2",
								content: (
									<Box className="troisi-showcase-cell troisi-showcase-cell--slide">
										Slide 2
									</Box>
								),
							},
							{
								id: "3",
								content: (
									<Box className="troisi-showcase-cell troisi-showcase-cell--slide">
										Slide 3
									</Box>
								),
							},
						]}
					/>
				</ShowcasePanel>
				<ShowcasePanel>
					<Timeline>
						<TimelineItem>
							<Typography variant="h3">Started (2024)</Typography>
							<Typography variant="body" tone="muted">
								Project kickoff
							</Typography>
						</TimelineItem>
						<TimelineItem>
							<Typography variant="h3">Shipped (2025)</Typography>
							<Typography variant="body" tone="muted">
								v0.1 release
							</Typography>
						</TimelineItem>
					</Timeline>
				</ShowcasePanel>
				<ShowcasePanel>
					<EmptyState
						title="No results"
						description="Try adjusting your filters."
					/>
				</ShowcasePanel>
				<ShowcasePanel>
					<Code>inline code</Code>
					<Spacer size={4} />
					<CodeBlock>{`function hello() {\n  return "troisi";\n}`}</CodeBlock>
				</ShowcasePanel>
			</ShowcaseSection>

			<ShowcaseSection id="media" title="Media">
				<ShowcasePanel className="troisi-showcase-media">
					<Image
						src="https://picsum.photos/800/450"
						alt="Sample landscape"
						width={800}
						height={450}
					/>
				</ShowcasePanel>
				<ShowcasePanel className="troisi-showcase-media">
					<Video
						src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
						controls
						preload="metadata"
					/>
				</ShowcasePanel>
			</ShowcaseSection>
		</>
	);
}
